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
			return getKingMoves(selectedSquare, board, currentTurn);

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

function getKingMoves(selectedSquare: Position, board: Board, currentTurn: PieceColour) {
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
	return moves;
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
		// create a new variable with the value of the current history item
		const historyItem = history[history.length - 1];
		// if the piece that last moved was a pawn
		if (board[historyItem.to.row][historyItem.to.column]?.type === "pawn") {
			// if the pawn moved from it's starting square two spaces forward (TODO: handle white pawns)
			if (historyItem.from.row === 1 && historyItem.to.row === 3) {
				// if { row: 2, column: historyItem.from.column } is controlled by a white piece (TODO: handle black pawns)
				const pieces = getAllPawnMoves(board, { row: 2, column: historyItem.from.column }, "white", []);
				if (pieces) {
					for (let index = 0; index < pieces.length; index++) {
						if (pieces[index] === selectedSquare) {
							moves.push({ row: 2, column: historyItem.from.column });
						}
					}
				}
			}
		}
	}

	return moves;
}

function getAllPawnMoves(
	board: Board,
	position: Position,
	colour: PieceColour,
	history: HistoryItem[]
): Position[] | null {
	const pawns: Position[] = [];
	// get the enemy moves
	// for each row
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// for each column
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			// if the piece on this square is a pawn of the right colour
			if (board[rowIndex][columnIndex]?.colour === colour && board[rowIndex][columnIndex]?.type === "pawn") {
				const selectedSquare: Position = { row: rowIndex, column: columnIndex };
				const currentSquare = board[rowIndex][columnIndex];
				if (currentSquare) {
					const enemyMoves = getBaseMoveOptions(selectedSquare, board, history);
					// check if the square is threatened
					// for every enemy move
					for (let moveIndex = 0; moveIndex < enemyMoves.length; moveIndex++) {
						const enemyMove = enemyMoves[moveIndex];
						// if the current enemy move is the same as the square that has been passed in
						if (enemyMove.row === position.row && enemyMove.column === position.column) {
							pawns.push(selectedSquare);
						}
					}
				}
			}
		}
	}
	if (pawns.length === 0) {
		return null;
	} else {
		return pawns;
	}
}
