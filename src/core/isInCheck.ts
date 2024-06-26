import { Board, BoardSquare, PieceColour, Position } from "./models";
import { getBaseMoveOptions } from "./getMoveOptions";

export function isInCheck(board: BoardSquare[][], kingColour: PieceColour, ignoreKing: boolean = false): boolean {
	// for info on ignoreKing see comments in isThreatened
	const opponentColour = kingColour === "white" ? "black" : "white";
	return isThreatened(board, opponentColour, findKing(board, kingColour), ignoreKing);
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

export function isThreatened(
	board: Board,
	opponentColour: PieceColour,
	position: Position,
	ignoreKing: boolean = false
) {
	// for each row
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// for each column
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			// if the piece on this square is the opponent's colour
			if (board[rowIndex][columnIndex]?.colour === opponentColour) {
				// if ignore king is set to true and the square we're on has the value of king, skip to the next square
				// (this is for the isInCheck function because the king can never be in check from another king)
				// This was added to avoid endless recursion!
				if (ignoreKing && board[rowIndex][columnIndex]?.type === "king") {
					continue;
				}
				const selectedSquare = { row: rowIndex, column: columnIndex };
				const currentSquare = board[rowIndex][columnIndex];
				if (currentSquare) {
					const enemyMoves = getBaseMoveOptions(selectedSquare, board, []);
					// check if position is threatened
					// for every enemy move
					for (let i = 0; i < enemyMoves.length; i++) {
						const enemyMove = enemyMoves[i];
						// check if position is in the array of enemy moves
						if (enemyMove.row === position.row && enemyMove.column === position.column) {
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}
