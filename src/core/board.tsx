import { Board, BoardSquare, PieceColour, PieceType, Position } from "./models";

export function getStartingBoard(): Board {
	return [
		[
			{ colour: "black", type: "rook" },
			{ colour: "black", type: "knight" },
			{ colour: "black", type: "bishop" },
			{ colour: "black", type: "queen" },
			{ colour: "black", type: "king" },
			{ colour: "black", type: "bishop" },
			{ colour: "black", type: "knight" },
			{ colour: "black", type: "rook" },
		],
		Array(8).fill({ colour: "black", type: "pawn" }),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill({ colour: "white", type: "pawn" }),
		[
			{ colour: "white", type: "rook" },
			{ colour: "white", type: "knight" },
			{ colour: "white", type: "bishop" },
			{ colour: "white", type: "queen" },
			{ colour: "white", type: "king" },
			{ colour: "white", type: "bishop" },
			{ colour: "white", type: "knight" },
			{ colour: "white", type: "rook" },
		],
	];
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
	to: Position
): Board {
	const newBoard = board.map((col) => col.slice());
	newBoard[to.row][to.column] = board[from.row][from.column];
	newBoard[from.row][from.column] = undefined;
	return newBoard;
}
