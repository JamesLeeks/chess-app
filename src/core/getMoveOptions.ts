import { PieceColour, Position } from "./models";

export function getMoveOptions(currentTurn: PieceColour, selectedSquare: Position): Position[] {
	if (currentTurn === "white") {
		return [
			{ row: selectedSquare.row - 1, column: selectedSquare.column },
			{ row: selectedSquare.row - 2, column: selectedSquare.column },
		];
	} else {
		return [
			{ row: selectedSquare.row + 1, column: selectedSquare.column },
			{ row: selectedSquare.row + 2, column: selectedSquare.column },
		];
	}
}
