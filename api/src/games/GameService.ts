// src/users/usersService.ts

import { Game } from "../../../common/src/game";

export class GameService {
	private games: Game[] = [];

	public get(id: string): Game | undefined {
		return this.games.find((game) => game.id === id);
	}

	public create(): Game {
		const game = new Game();
		this.games.push(game);
		return game;
	}
}

export const gameService = new GameService();
