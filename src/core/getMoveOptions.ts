import { BoardSquare, PieceColour, Position } from "./models";

export function getMoveOptions(currentTurn: PieceColour, selectedSquare: Position, board: BoardSquare[][]): Position[] {
	if (!board[selectedSquare.row][selectedSquare.column]) {
		throw new Error("should not get moves for undefined");
	}
	if (board[selectedSquare.row][selectedSquare.column]?.type === "pawn") {
		if (currentTurn === "white") {
			if (selectedSquare.row === 6) {
				return [
					{ row: selectedSquare.row - 1, column: selectedSquare.column },
					{ row: selectedSquare.row - 2, column: selectedSquare.column },
				];
			} else {
				return [{ row: selectedSquare.row - 1, column: selectedSquare.column }];
			}
		} else {
			if (selectedSquare.row === 1) {
				return [
					{ row: selectedSquare.row + 1, column: selectedSquare.column },
					{ row: selectedSquare.row + 2, column: selectedSquare.column },
				];
			} else {
				return [{ row: selectedSquare.row + 1, column: selectedSquare.column }];
			}
		}
	}
	return [];
}
