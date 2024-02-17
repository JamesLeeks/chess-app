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

		case "bishop":
			return getBishopMoves(selectedSquare, board, currentTurn);

		default:
			return [];
	}
}

function getMovesForDirection(
	selectedSquare: Position,
	board: BoardSquare[][],
	currentTurn: PieceColour,
	rowDirection: number,
	colunmDirection: number
) {
	const opponentTurn = currentTurn === "white" ? "black" : "white";
	const moves: Position[] = [];

	let rowIndex = selectedSquare.row + rowDirection;
	let columnIndex = selectedSquare.column + colunmDirection;
	while (rowIndex >= 0 && rowIndex <= 7 && columnIndex >= 0 && columnIndex <= 7) {
		const currentSquare = board[rowIndex][columnIndex];
		if (currentSquare?.colour === currentTurn) {
			// Hit our own piece - don't add and stop searching
			break;
		}

		moves.push({ row: rowIndex, column: columnIndex });

		if (currentSquare?.colour === opponentTurn) {
			// Hit an opponent piece - don't search any further
			break;
		}
		rowIndex = rowIndex + rowDirection;
		columnIndex = columnIndex + colunmDirection;
	}

	return moves;
}

function getBishopMoves(selectedSquare: Position, board: BoardSquare[][], currentTurn: PieceColour) {
	const moves: Position[] = [];

	// up right
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, -1, 1));

	// up left
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, -1, -1));

	// down right
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, 1, 1));

	// down left
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, 1, -1));

	return moves;
}

function getRookMoves(selectedSquare: Position, board: BoardSquare[][], currentTurn: PieceColour) {
	const moves: Position[] = [];

	// upwards
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, -1, 0));

	// downwards
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, 1, 0));

	// right
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, 0, 1));

	// left
	moves.push(...getMovesForDirection(selectedSquare, board, currentTurn, 0, -1));

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
