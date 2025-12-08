import { Route, Controller, Get, Path, Post, Body, Security, Request } from "tsoa";
import * as express from "express";
import { Game, SerializedGame } from "../../../common/src/game";
import { gameService } from "../services/GameService";
import { allowSpectators, ApiGame, PieceColour, Position, PromotionType } from "../../../common/src/models";
import { getServer } from "../socket";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../errorMiddleware";
import { ensureUserId, getUserIdFromRequest } from "../../authentication";
import { userService } from "../services/UserService";
import { error } from "console";

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
	): Promise<ApiGame> {
		const userId = ensureUserId(req);

		const game = await gameService.addPlayer(gameId, userId);

		this.ensureUserCanSeeGame(game, userId);

		return { ...game.toJsonObject(), ...(await this.getUsernamesForGame(game)) };
	}

	@Security("AADB2C")
	@Get("{gameId}")
	public async getGame(
		@Request()
		req: express.Request,
		@Path()
		gameId: string
	): Promise<ApiGame> {
		const userId = ensureUserId(req);

		const gameResponse = await gameService.get(gameId);
		if (!gameResponse) {
			throw new NotFoundError();
		}

		const game = gameResponse.game;
		if (game.playerId) {
			if (userId !== game.ownerId && userId !== game.playerId && game.allowSpectators !== "public") {
				throw new NotFoundError();
			}
		}

		this.ensureUserCanSeeGame(game, userId);

		return {
			...game.toJsonObject(),
			...(await this.getUsernamesForGame(game)),
		};
	}

	@Security("AADB2C")
	@Get("")
	public async getGamesForUser(
		@Request()
		req: express.Request
	): Promise<ApiGame[]> {
		const userId = ensureUserId(req);

		const response = await gameService.getGamesForUser(userId);
		if (!response) {
			throw new NotFoundError();
		}

		const ownerIds = response.map((g) => g.ownerId);
		const playerIds = response.map((g) => g.playerId).filter((i) => i !== undefined);
		const userIdsToLookUp = ownerIds.concat(playerIds);

		const userIdMap: Record<string, string> = {};

		for (let i = 0; i < userIdsToLookUp.length; i++) {
			const userId = userIdsToLookUp[i];

			if (!userId) {
				continue;
			}
			const user = await userService.get(userId);
			if (!user) {
				throw new Error("user should have value");
			}
			userIdMap[userId] = user?.username;
		}

		const games: ApiGame[] = response.map((g) => {
			return { ...g.toJsonObject(), ownerName: userIdMap[g.ownerId ?? ""], playerName: userIdMap[g.playerId ?? ""] };
		});

		return games;
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
	): Promise<ApiGame> {
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

		return { ...newGameJson, ...(await this.getUsernamesForGame(game)) };
	}

	private async getUsernamesForGame(game: Game) {
		if (!game.ownerId) {
			throw new Error("game should have ownerId");
		}
		// get owner name
		const ownerResponse = await userService.get(game.ownerId);
		if (!ownerResponse) {
			throw new NotFoundError();
		}

		// if player: get player name
		const playerResponse = game.playerId ? await userService.get(game.playerId) : undefined;
		if (game.playerId && !playerResponse) {
			throw new NotFoundError();
		}
		return { ownerName: ownerResponse.username, playerName: playerResponse?.username };
	}

	private ensureUserCanSeeGame(game: Game, userId: string) {
		if (game.specifiedOpponent) {
			if (
				userId !== game.ownerId &&
				userId !== game.playerId &&
				userId !== game.specifiedOpponent &&
				game.allowSpectators !== "public"
			) {
				throw new NotFoundError();
			}
		}
	}
}
