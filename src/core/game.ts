import { makeMove } from "./board";
import { getMoveOptions } from "./getMoveOptions";
import { Board, Position } from "./models";

export class Game {
	private _board: Board;

	constructor(board: Board) {
		this._board = board;
	}

	public get board(): Board {
		return this._board;
	}
	getMoveOptions(selectedSquare: Position): Position[] {
		// TODO - should we move getMoveOptions code here?
		return getMoveOptions(selectedSquare, this._board);
	}
	makeMove(from: Position, to: Position): Game {
		const newBoard = makeMove(this._board, from, to);
		const newGame = new Game(newBoard);
		return newGame;
	}
}
