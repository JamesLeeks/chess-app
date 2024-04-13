import { BoardSquare, PieceColour, Position } from "./models";
import { getBaseMoveOptions } from "./getMoveOptions";

export function isInCheck(board: BoardSquare[][], kingColour: PieceColour): boolean {
	const kingPosition = findKing(board, kingColour);
	// get the enemy moves
	// for each row
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// for each column
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			// if the piece on this square is the opponnent's colour
			if (board[rowIndex][columnIndex]?.colour !== kingColour) {
				const selectedSquare = { row: rowIndex, column: columnIndex };
				const currentSquare = board[rowIndex][columnIndex];
				if (currentSquare) {
					const enemyMoves = getBaseMoveOptions(selectedSquare, board, []);
					// check if the king is in check
					// for every enemy move
					for (let i = 0; i < enemyMoves.length; i++) {
						const enemyMove = enemyMoves[i];
						// if the current enemy move is the same as the square the king is on
						if (enemyMove.row === kingPosition.row && enemyMove.column === kingPosition.column) {
							return true;
						}
					}
				}
			}
		}
	}

	return false;
}

function findKing(board: BoardSquare[][], kingColour: PieceColour): Position {
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			const currentSquare = board[rowIndex][columnIndex];
			if (currentSquare?.type === "king" && currentSquare.colour === kingColour) {
				return { row: rowIndex, column: columnIndex };
			}
		}
	}
	throw new Error(`Cannot find ${kingColour} king`);
}
