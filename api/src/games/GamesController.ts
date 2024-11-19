import { Route, Controller, Get, Path, Post, Body } from "tsoa";
import { Game } from "./models";
import { SerializedGame } from "../../../common/src/game";
import { gameService } from "./GameService";
import { Position, PromotionType } from "../../../common/src/models";

interface MakeMoveBody {
	from: Position;
	to: Position;
	promotionType?: PromotionType;
}

@Route("games")
export class GamesController extends Controller {
	@Post()
	public async addGame(): Promise<{ id: string }> {
		return {
			id: gameService.create().id,
		};
	}
	@Get("{gameId}")
	public async getGame(@Path() gameId: string): Promise<SerializedGame> {
		const game = gameService.get(gameId);
		if (!game) {
			throw new Error("TODO: 404 not found");
		}
		return game.toJsonObject();
	}
	@Post("{gameId}/moves")
	public async makeMove(@Path() gameId: string, @Body() move: MakeMoveBody): Promise<SerializedGame> {
		const newGame = gameService.makeMove(gameId, move.from, move.to, move.promotionType);

		return newGame.toJsonObject();
	}
}