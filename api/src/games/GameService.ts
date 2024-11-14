// src/users/usersService.ts

import { Game } from "../../../common/src/game";
import { Position, PromotionType } from "../../../common/src/models";

export class GameService {
	private games: Record<string, Game> = {};

	public create(): Game {
		const game = new Game();
		this.games[game.id] = game;
		return game;
	}

	public get(id: string): Game | undefined {
		return this.games[id];
	}

	public makeMove(gameId: string, from: Position, to: Position, promotionType?: PromotionType): Game {
		const game = this.get(gameId);
		if (!game) {
			throw new Error("TODO: THINK ABOUT IT Game not found");
		}
		const newGame = game.makeMove(from, to, promotionType);
		this.games[gameId] = newGame;
		return newGame;
	}
}

export const gameService = new GameService();
