import { Route, Controller, Get, Path, Post, Body, Security, Request } from "tsoa";
import * as express from "express";
import { Game, SerializedGame } from "../../../common/src/game";
import { gameService } from "../services/GameService";
import { allowSpectators, PieceColour, Position, PromotionType } from "../../../common/src/models";
import { getServer } from "../socket";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../errorMiddleware";
import { ensureUserId, getUserIdFromRequest } from "../../authentication";
import { userService } from "../services/UserService";

interface MakeMoveBody {
	from: Position;
	to: Position;
	promotionType?: PromotionType;
}

interface AddGameOptions {
	startingTime: number;
	ownerSide: PieceColour;
	allowSpectators: allowSpectators;
	specifiedOpponent: string | undefined;
}

@Route("games")
export class GameController extends Controller {
	@Security("AADB2C")
	@Post()
	public async addGame(
		@Request()
		req: express.Request,
		@Body()
		options: AddGameOptions
	): Promise<{ id: string }> {
		const userId = ensureUserId(req);

		if (!options.specifiedOpponent) {
			const game = await gameService.create(
				userId,
				options.startingTime,
				options.ownerSide,
				options.allowSpectators,
				undefined
			);

			console.log("DIDN'T GET SPECIFIED OPPONENT");

			return {
				id: game.id,
			};
		} else {
			const user = await userService.getByUsername(options.specifiedOpponent);
			if (!user) {
				throw new Error("failed to get user by username");
			}
			const opponentId = user.id;

			console.log(`game controller add game: ${opponentId}`);

			const game = await gameService.create(
				userId,
				options.startingTime,
				options.ownerSide,
				options.allowSpectators,
				opponentId
			);

			return {
				id: game.id,
			};
		}
	}

	@Security("AADB2C")
	@Post("{gameId}/addPlayer")
	public async addPlayer(
		@Request()
		req: express.Request,
		@Path()
		gameId: string
	): Promise<{ id: string }> {
		const userId = ensureUserId(req);

		const game = await gameService.addPlayer(gameId, userId);
		return game.toJsonObject();
	}

	@Security("AADB2C")
	@Get("{gameId}")
	public async getGame(
		@Request()
		req: express.Request,
		@Path()
		gameId: string
	): Promise<SerializedGame> {
		const userId = ensureUserId(req);

		const response = await gameService.get(gameId);
		if (!response) {
			throw new NotFoundError();
		}
		if (response.game.playerId) {
			if (
				userId !== response.game.ownerId &&
				userId !== response.game.playerId &&
				response.game.allowSpectators !== "public"
			) {
				throw new NotFoundError();
			}
		}

		if (response.game.specifiedOpponent) {
			if (
				userId !== response.game.ownerId &&
				userId !== response.game.playerId &&
				userId !== response.game.specifiedOpponent &&
				response.game.allowSpectators !== "public"
			) {
				throw new NotFoundError();
			}
		}

		return response.game.toJsonObject();
	}

	@Security("AADB2C")
	@Post("{gameId}/moves")
	public async makeMove(
		@Request()
		req: express.Request,
		@Path()
		gameId: string,
		@Body()
		move: MakeMoveBody
	): Promise<SerializedGame> {
		const userId = ensureUserId(req);

		const response = await gameService.get(gameId);

		// check that there is a response, and that the user is the owner/player on the game
		if (!response || (userId !== response.game.ownerId && userId !== response.game.playerId)) {
			throw new NotFoundError();
		}

		const game = response.game;
		const playerColour = game.getUserColour(userId);
		if (game.currentTurn !== playerColour) {
			throw new BadRequestError("not your turn");
		}

		const newGame = await gameService.makeMove(response.game, response.etag, move.from, move.to, move.promotionType);

		if (!newGame) {
			throw new NotFoundError();
		}

		const newGameJson = newGame.toJsonObject();
		const io = getServer();
		io.to(`game-${gameId}`).emit("gameUpdate", newGameJson);

		return newGameJson;
	}
}
