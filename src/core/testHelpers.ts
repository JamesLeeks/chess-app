import { Board } from "./models";
import { Game } from "./game";

export function getGame(board: Board) {
	return new Game(board);
}
