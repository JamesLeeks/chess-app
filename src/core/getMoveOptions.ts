import { getBoardAfterMove } from "./board";
import { isInCheck, isThreatened } from "./isInCheck";
import { Board, BoardSquare, HistoryItem, PieceColour, Position } from "./models";

export function getBaseMoveOptions(selectedSquare: Position, board: Board, history: HistoryItem[]): Position[] {
	const selectedPiece = board[selectedSquare.row][selectedSquare.column];
	if (!selectedPiece) {
		throw new Error("should not get moves for undefined");
	}
	const currentTurn = selectedPiece.colour;

	switch (board[selectedSquare.row][selectedSquare.column]?.type) {
		case "pawn":
			return getPawnMoves(selectedSquare, board, currentTurn, history);

		case "rook":
			return getRookMoves(selectedSquare, board, currentTurn);

		case "bishop":
			return getBishopMoves(selectedSquare, board, currentTurn);

		case "queen":
			return getQueenMoves(selectedSquare, board, currentTurn);

		case "knight":
			return getKnightMoves(selectedSquare, board, currentTurn);

		case "king":
			return getKingMoves(history, board, selectedSquare, currentTurn);

		default:
			return [];
	}
}

function getMovesForDirection(
	selectedSquare: Position,
	board: Board,
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

function getKingMoves(history: HistoryItem[], board: Board, selectedSquare: Position, currentTurn: PieceColour) {
	const homeRow = currentTurn === "white" ? 7 : 0;
	const moves: Position[] = [
		{ row: selectedSquare.row + 1, column: selectedSquare.column },
		{ row: selectedSquare.row + 1, column: selectedSquare.column + 1 },
		{ row: selectedSquare.row + 1, column: selectedSquare.column - 1 },
		{ row: selectedSquare.row, column: selectedSquare.column + 1 },
		{ row: selectedSquare.row, column: selectedSquare.column - 1 },
		{ row: selectedSquare.row - 1, column: selectedSquare.column },
		{ row: selectedSquare.row - 1, column: selectedSquare.column + 1 },
		{ row: selectedSquare.row - 1, column: selectedSquare.column - 1 },
	]
		.filter((pos) => pos.row >= 0 && pos.row <= 7)
		.filter((pos) => pos.column >= 0 && pos.column <= 7)
		.filter((pos) => board[pos.row][pos.column]?.colour !== currentTurn);

	if (canCastle(history, board, homeRow, currentTurn, 1)) {
		// push right side castling to move options
		moves.push({ row: homeRow, column: 6 });
	}
	if (canCastle(history, board, homeRow, currentTurn, -1)) {
		// push left side castling to move options
		moves.push({ row: homeRow, column: 2 });
	}
	return moves;
}

function canCastle(
	history: HistoryItem[],
	board: Board,
	homeRow: number,
	currentTurn: PieceColour,
	direction: 1 | -1
): boolean {
	const rookColumn = direction === 1 ? 7 : 0;
	const kingColumn = 4;

	// is the rook in the correct place for castling
	if (board[homeRow][rookColumn]?.colour !== currentTurn || board[homeRow][rookColumn]?.type !== "rook") {
		return false;
	}

	// is the king is in the right place for castling
	if (board[homeRow][kingColumn]?.colour !== currentTurn || board[homeRow][kingColumn]?.type !== "king") {
		return false;
	}

	// do pieces block the path
	for (let index = kingColumn + direction; index !== rookColumn; index += direction) {
		if (board[homeRow][index]) {
			return false;
		}
	}

	// has the rook moved before
	const hasRookMoved = history.find(
		(historyItem) =>
			(historyItem.from.row === homeRow && historyItem.from.column === rookColumn) ||
			(historyItem.to.row === homeRow && historyItem.to.column === rookColumn)
	);
	if (hasRookMoved) {
		// there was a move on the rook square
		return false;
	}

	// has the king moved before
	const hasKingMoved = history.find(
		(historyItem) =>
			(historyItem.from.row === homeRow && historyItem.from.column === kingColumn) ||
			(historyItem.to.row === homeRow && historyItem.to.column === kingColumn)
	);
	if (hasKingMoved) {
		// there was a move on the king square
		return false;
	}

	// would the king be in check after castling
	if (
		isInCheck(
			getBoardAfterMove(
				board,
				{ column: kingColumn, row: homeRow },
				{ column: kingColumn + direction * 2, row: homeRow }
			),
			currentTurn
		)
	) {
		return false;
	}

	// is the path threatened by an opponent's piece
	const opponentColour = currentTurn === "white" ? "black" : "white";
	if (isThreatened(board, opponentColour, { column: kingColumn + direction, row: homeRow })) {
		return false;
	}

	// check if the king is in check
	if (isInCheck(board, currentTurn)) {
		return false;
	}

	return true;
}

function getKnightMoves(selectedSquare: Position, board: Board, currentTurn: PieceColour) {
	const moves: Position[] = [
		{ row: selectedSquare.row - 1, column: selectedSquare.column + 2 },
		{ row: selectedSquare.row - 1, column: selectedSquare.column - 2 },
		{ row: selectedSquare.row - 2, column: selectedSquare.column + 1 },
		{ row: selectedSquare.row - 2, column: selectedSquare.column - 1 },
		{ row: selectedSquare.row + 1, column: selectedSquare.column + 2 },
		{ row: selectedSquare.row + 1, column: selectedSquare.column - 2 },
		{ row: selectedSquare.row + 2, column: selectedSquare.column + 1 },
		{ row: selectedSquare.row + 2, column: selectedSquare.column - 1 },
	]
		.filter((pos) => pos.row >= 0 && pos.row <= 7)
		.filter((pos) => pos.column >= 0 && pos.column <= 7)
		.filter((pos) => board[pos.row][pos.column]?.colour !== currentTurn);
	return moves;
}

function getQueenMoves(selectedSquare: Position, board: BoardSquare[][], currentTurn: PieceColour) {
	const moves: Position[] = [];
	moves.push(...getBishopMoves(selectedSquare, board, currentTurn));
	moves.push(...getRookMoves(selectedSquare, board, currentTurn));
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

function getPawnMoves(selectedSquare: Position, board: Board, currentTurn: PieceColour, history: HistoryItem[]) {
	const opponentTurn = currentTurn === "white" ? "black" : "white";
	const moves: Position[] = [];
	const homeRow = currentTurn === "white" ? 6 : 1;
	const direction = currentTurn === "white" ? -1 : 1;

	// moves
	// if the square in front is free:
	if (!board[selectedSquare.row + 1 * direction][selectedSquare.column]) {
		// add that square to the move options
		moves.push({ row: selectedSquare.row + 1 * direction, column: selectedSquare.column });
		// if on starting square and the square two spaces in front is free:
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

	// en passant
	// if the history length is not zero
	if (history.length !== 0) {
		const HistoryItem = history[history.length - 1];
		// if the last piece moved was a pawn
		if (board[HistoryItem.to.row][HistoryItem.to.column]?.type === "pawn") {
			const distanceMoved = HistoryItem.from.row - HistoryItem.to.row;
			// If the pawn moved two spaces
			if (Math.abs(distanceMoved) === 2) {
				const direction = distanceMoved > 0 ? 1 : -1;
				// if there is a pawn of the oposite colour on the same row
				if (selectedSquare.row === HistoryItem.to.row) {
					// if there is a pawn ajacent to the pawn that was just moved
					if (
						selectedSquare.column === HistoryItem.to.column - 1 ||
						selectedSquare.column === HistoryItem.to.column + 1
					) {
						moves.push({ row: HistoryItem.to.row + direction, column: HistoryItem.to.column });
					}
				}
			}
		}
	}

	return moves;
}
