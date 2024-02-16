import { BoardSquare, PieceColour, Position } from "./models";

export function getMoveOptions(selectedSquare: Position, board: BoardSquare[][]): Position[] {
	const selectedPiece = board[selectedSquare.row][selectedSquare.column];
	if (!selectedPiece) {
		throw new Error("should not get moves for undefined");
	}
	const currentTurn = selectedPiece.colour;

	switch (board[selectedSquare.row][selectedSquare.column]?.type) {
		case "pawn":
			return getPawnMoves(selectedSquare, board, currentTurn);

		case "rook":
			return getRookMoves(selectedSquare, board, currentTurn);

		default:
			return [];
	}
}

function getRookMoves(selectedSquare: Position, board: BoardSquare[][], currentTurn: PieceColour) {
	const opponentTurn = currentTurn === "white" ? "black" : "white";
	const moves: Position[] = [];

	// upwards
	for (let rowIndex = selectedSquare.row - 1; rowIndex >= 0; rowIndex--) {
		const currentSquare = board[rowIndex][selectedSquare.column];
		// // if the next square in the column is free:
		// if (!currentSquare) {
		// 	moves.push({ row: rowIndex, column: selectedSquare.column });
		// 	// if the next square in the column has an opponent's piece on it:
		// } else if (currentSquare?.colour !== currentTurn) {
		// 	moves.push({ row: rowIndex, column: selectedSquare.column });
		// 	break;
		// } else {
		// 	break;
		// }

		if (currentSquare?.colour === currentTurn) {
			// Hit our own piece - don't add and stop searching
			break;
		}

		moves.push({ row: rowIndex, column: selectedSquare.column });

		if (currentSquare?.colour === opponentTurn) {
			// Hit an opponent piece - don't search any further
			break;
		}
	}

	// downwards
	for (let rowIndex = selectedSquare.row + 1; rowIndex <= 7; rowIndex++) {
		const currentSquare = board[rowIndex][selectedSquare.column];

		if (currentSquare?.colour === currentTurn) {
			// Hit our own piece - don't add and stop searching
			break;
		}

		moves.push({ row: rowIndex, column: selectedSquare.column });

		if (currentSquare?.colour === opponentTurn) {
			// Hit an opponent piece - don't search any further
			break;
		}
	}

	// right
	for (let columnIndex = selectedSquare.column + 1; columnIndex <= 7; columnIndex++) {
		const currentSquare = board[selectedSquare.row][columnIndex];

		if (currentSquare?.colour === currentTurn) {
			// Hit our own piece - don't add and stop searching
			break;
		}

		moves.push({ row: selectedSquare.row, column: columnIndex });

		if (currentSquare?.colour === opponentTurn) {
			// Hit an opponent piece - don't search any further
			break;
		}
	}

	return moves;
}

function getPawnMoves(selectedSquare: Position, board: BoardSquare[][], currentTurn: PieceColour) {
	const opponentTurn = currentTurn === "white" ? "black" : "white";
	const moves: Position[] = [];
	const homeRow = currentTurn === "white" ? 6 : 1;
	const direction = currentTurn === "white" ? -1 : 1;

	// moves
	// if the square in front is free:
	if (!board[selectedSquare.row + 1 * direction][selectedSquare.column]) {
		// add that square to the move options
		moves.push({ row: selectedSquare.row + 1 * direction, column: selectedSquare.column });
		// if the square two spaces in front is free:
		if (selectedSquare.row === homeRow && !board[selectedSquare.row + 2 * direction][selectedSquare.column]) {
			// add that square to the move options
			moves.push({ row: selectedSquare.row + 2 * direction, column: selectedSquare.column });
		}
	}
	// captures
	if (board[selectedSquare.row + 1 * direction][selectedSquare.column + 1]?.colour === opponentTurn) {
		moves.push({ row: selectedSquare.row + 1 * direction, column: selectedSquare.column + 1 });
	}
	if (board[selectedSquare.row + 1 * direction][selectedSquare.column - 1]?.colour === opponentTurn) {
		moves.push({ row: selectedSquare.row + 1 * direction, column: selectedSquare.column - 1 });
	}
	return moves;
}
