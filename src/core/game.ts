import { makeMove } from "./board";
import { getBaseMoveOptions } from "./getMoveOptions";
import { isInCheck } from "./isInCheck";
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
		const selectedPiece = this._board[selectedSquare.row][selectedSquare.column];
		if (!selectedPiece) {
			throw new Error("should not get moves for undefined");
		}
		const currentTurn = selectedPiece.colour;

		const baseMoves = getBaseMoveOptions(selectedSquare, this._board);
		const filteredMoves: Position[] = [];

		// remove check moves
		for (let i = 0; i < baseMoves.length; i++) {
			const move = baseMoves[i];
			const boardAfterMove = makeMove(this._board, selectedSquare, move);
			const isCheck = isInCheck(boardAfterMove, currentTurn);

			if (!isCheck) {
				filteredMoves.push(move);
			}
		}

		return filteredMoves;
	}
	makeMove(from: Position, to: Position): Game {
		const newBoard = makeMove(this._board, from, to);
		const newGame = new Game(newBoard);
		return newGame;
	}
}
