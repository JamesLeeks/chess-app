import {
	Board,
	BoardSquare,
	PieceColour,
	PieceType,
	Position,
	PromotionType,
} from "./models";

export function getStartingBoard(): Board {
	return parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
}

export function parseBoard(boardString: string): Board {
	const trimmedBoard = boardString.trim();
	const boardRows = trimmedBoard
		.split("\n")
		.map((rowString) => rowString.trim()); // trim each row

	// if the board does not have 8 rows: throw an error
	if (boardRows.length !== 8) {
		throw new Error("board should have 8 rows");
	}

	const rowArray = [];
	for (let rowIndex = 0; rowIndex < boardRows.length; rowIndex++) {
		// for each row in the board:
		// split the row into squares
		const row = boardRows[rowIndex];
		const squares = row.split(" ");
		const squareArray = [];
		for (let squareIndex = 0; squareIndex < squares.length; squareIndex++) {
			// for each square in the row:
			const squareString = squares[squareIndex];
			const square: BoardSquare = getPieceFromString(squareString);
			squareArray.push(square);
		}
		rowArray.push(squareArray);
	}
	return rowArray;
}

export function boardToString(board: Board): string {
	let boardString = "";
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
		let rowString = "";
		let spacer = "";
		for (
			let columnIndex = 0;
			columnIndex < board[rowIndex].length;
			columnIndex++
		) {
			const chessPiece = board[rowIndex][columnIndex];
			const squareNotation = getStringFromPiece(chessPiece);
			rowString += spacer + squareNotation;
			spacer = " ";
		}
		boardString += rowString + "\n";
	}
	return boardString;
}

function getPieceFromString(squareString: string) {
	if (squareString === "--") {
		return undefined;
	} else {
		let colour: PieceColour = getColourFromString(squareString[0]);
		let type: PieceType = getPieceTypeFromString(squareString[1]);
		return { colour, type };
	}
}

function getStringFromPiece(piece: BoardSquare) {
	if (!piece) {
		return "--";
	}
	let colourString: string;
	if (piece.colour === "white") {
		colourString = "W";
	} else {
		colourString = "B";
	}
	const pieceType = piece.type;
	let typeString = "";

	switch (pieceType) {
		case "rook":
			typeString = "R";
			break;

		case "knight":
			typeString = "N";
			break;

		case "bishop":
			typeString = "B";
			break;

		case "king":
			typeString = "K";
			break;

		case "queen":
			typeString = "Q";
			break;

		case "pawn":
			typeString = "P";
			break;

		default:
			throw new Error("piece should have a type");
	}

	return colourString + typeString;
}

function getColourFromString(pieceColourString: string) {
	if (pieceColourString === "W") {
		return "white";
	} else if (pieceColourString === "B") {
		return "black";
	} else {
		throw new Error(`Invalid colour: ${pieceColourString}`);
	}
}

function getPieceTypeFromString(pieceTypeString: string): PieceType {
	switch (pieceTypeString) {
		case "P":
			return "pawn";
		case "R":
			return "rook";
		case "N":
			return "knight";
		case "B":
			return "bishop";
		case "Q":
			return "queen";
		case "K":
			return "king";
		default:
			throw new Error("piece should have a type");
	}
}

export function getBoardAfterMove(
	board: Board,
	from: Position,
	to: Position,
	promotionType?: PromotionType
): Board {
	const fromSquare = board[from.row][from.column];
	if (!fromSquare) {
		throw new Error("No piece on starting square");
	}

	// copy the board:
	const newBoard = board.map(
		// function (column) { return column.slice(); }
		// (parameters) => resulting_value;
		(column) => column.slice()
	);

	// handle en passant
	// if it's a pawn move
	if (newBoard[from.row][from.column]?.type === "pawn") {
		// if it's a diagonal move
		if (from.column !== to.column) {
			// if it's a blank square
			if (!newBoard[to.row][to.column]) {
				// remove the piece on the same row you were at and the column you are now at
				newBoard[from.row][to.column] = undefined;
			}
		}
	}

	// handle castling
	// if it's a king move
	if (newBoard[from.row][from.column]?.type === "king") {
		// if it's a move to the right
		if (from.column < to.column) {
			// if it moves over multiple squares
			if (to.column - from.column > 1) {
				// replace the square to the left of the king with the rook on the square to the right of the king
				newBoard[to.row][to.column - 1] = board[to.row][to.column + 1];
				// clear the square to the right of the king
				newBoard[to.row][to.column + 1] = undefined;
			}
		} else {
			// if it moves over multiple squares
			if (from.column - to.column > 1) {
				// replace the square to the right of the king with the rook on the square two spaces to the left of the king
				newBoard[to.row][to.column + 1] = board[to.row][to.column - 2];
				// clear the square two spaces to the left of the king
				newBoard[to.row][to.column - 2] = undefined;
			}
		}
	}

	// set the destination to have the value of the starting square
	if (promotionType) {
		newBoard[to.row][to.column] = {
			colour: fromSquare.colour,
			type: promotionType,
		};
	} else {
		newBoard[to.row][to.column] = board[from.row][from.column];
	}

	// clear the starting square
	newBoard[from.row][from.column] = undefined;

	// return the updated board
	return newBoard;
}
