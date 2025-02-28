import { Route, Controller, Get, Path, Post, Body, Security, Request } from "tsoa";
import { Game } from "./models";
import * as express from "express";
import { SerializedGame } from "../../../common/src/game";
import { gameService } from "./GameService";
import { Position, PromotionType } from "../../../common/src/models";
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
		// const startingTime = 9999;

		const game = await gameService.create(userId, options.startingTime);
		return {
			id: game.id,
		};
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
		if (!response || userId !== response.game.ownerId) {
			throw new NotFoundError();
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
		if (!response || userId !== response.game.ownerId) {
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
