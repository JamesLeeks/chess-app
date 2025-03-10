import { Route, Controller, Get, Path, Post, Body, Security, Request } from "tsoa";
import { Game } from "./models";
import * as express from "express";
import { SerializedGame } from "../../../common/src/game";
import { gameService } from "./GameService";
import { PieceColour, Position, PromotionType } from "../../../common/src/models";
import { getServer } from "../socket";
import { NotFoundError, UnauthorizedError } from "../../errorMiddleware";
import { ensureUserId, getUserIdFromRequest } from "../../authentication";

interface MakeMoveBody {
	from: Position;
	to: Position;
	promotionType?: PromotionType;
}

interface AddGameOptions {
	startingTime: number;
	ownerSide: PieceColour;
}

@Route("games")
export class GamesController extends Controller {
	@Security("AADB2C")
	@Post()
	public async addGame(
		@Request()
		req: express.Request,
		@Body()
		options: AddGameOptions
	): Promise<{ id: string }> {
		const userId = ensureUserId(req);

		const game = await gameService.create(userId, options.startingTime, options.ownerSide);
		return {
			id: game.id,
		};
	}

	@Security("AADB2C")
	@Post("{gameId}/addPlayer")
	public async addPlayer(
		@Request()
		req: express.Request,
		@Path()
		gameId: string
		// @Body()
		// options: AddGameOptions
	): Promise<{ id: string }> {
		const userId = ensureUserId(req);

		// const game = await gameService.create(userId, options.startingTime, options.ownerSide);
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
			console.log("from GamesController.ts: ACTUAL NOT FOUND ERROR");
			throw new NotFoundError();
		}
		if (response.game.playerId) {
			if (userId !== response.game.ownerId && userId !== response.game.playerId) {
				console.log("from GamesController.ts: help");
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

		if (!response || (userId !== response.game.ownerId && userId !== response.game.playerId)) {
			throw new NotFoundError();
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
