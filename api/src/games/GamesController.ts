import { Route, Controller, Get, Path, Post, Body } from "tsoa";
import { Game } from "./models";
import { SerializedGame } from "../../../common/src/game";
import { gameService } from "./GameService";
import { Position, PromotionType } from "../../../common/src/models";
import { getServer } from "../socket";
import { NotFoundError } from "../../errorMiddleware";

interface MakeMoveBody {
	from: Position;
	to: Position;
	promotionType?: PromotionType;
}

@Route("games")
export class GamesController extends Controller {
	@Post()
	public async addGame(): Promise<{ id: string }> {
		const game = await gameService.create();
		return {
			id: game.id,
		};
	}

	@Get("{gameId}")
	public async getGame(@Path() gameId: string): Promise<SerializedGame> {
		const game = await gameService.get(gameId);
		if (!game) {
			throw new NotFoundError();
		}

		return game.toJsonObject();
	}

	@Post("{gameId}/moves")
	public async makeMove(@Path() gameId: string, @Body() move: MakeMoveBody): Promise<SerializedGame> {
		const newGame = await gameService.makeMove(gameId, move.from, move.to, move.promotionType);

		if (!newGame) {
			throw new NotFoundError();
		}

		const newGameJson = newGame.toJsonObject();
		const io = getServer();
		io.to(`game-${gameId}`).emit("gameUpdate", newGameJson);

		return newGameJson;
	}
}
