import { Board, PieceColour } from "./models";
import { Game } from "./game";

export function getGame(board: Board, whiteTime?: number, blackTime?: number, currentTurn?: PieceColour) {
	return new Game(board, [], currentTurn ?? "white", whiteTime, blackTime);
}
