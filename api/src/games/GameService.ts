// src/users/usersService.ts

import { Game } from "../../../common/src/game";
import { Position, PromotionType } from "../../../common/src/models";

export class GameService {
	private games: Record<string, Game> = {}; // DUMMY DATABASE

	public async create(): Promise<Game> {
		for (let index = 0; index < 5; index++) {
			const game = new Game();
			if (!this.games[game.id]) {
				this.games[game.id] = game;
				return game;
			}
		}
		throw new Error("Game id should be unique");
	}

	public async get(id: string): Promise<Game | undefined> {
		return this.games[id];
	}

	public async makeMove(gameId: string, from: Position, to: Position, promotionType?: PromotionType): Promise<Game> {
		const game = await this.get(gameId);
		if (!game) {
			throw new Error("TODO: THINK ABOUT IT Game not found");
		}
		const newGame = game.makeMove(from, to, promotionType);
		this.games[gameId] = newGame;
		return newGame;
	}
}

export const gameService = new GameService();
