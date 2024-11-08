import { Route, Controller, Get, Path, Post } from "tsoa";
import { Game } from "./models";
import { SerializedGame } from "../../../common/src/game";
import { gameService } from "./GameService";

@Route("games")
export class GamesController extends Controller {
	@Get("{gameId}")
	public async getGame(@Path() gameId: string): Promise<SerializedGame> {
		const game = gameService.get(gameId);
		if (!game) {
			throw new Error("TODO: 404 not found");
		}
		return game.toJsonObject();
	}
	@Post()
	public async addGame(): Promise<{ id: string }> {
		return {
			id: gameService.create().id,
		};
	}
}
