import { BoardSquare, PieceColour, PieceType } from "./models";

export function getStartingBoard(): BoardSquare[][] {
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

export function parseBoard(boardString: string): BoardSquare[][] {
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
function getPieceFromString(squareString: string) {
	if (squareString === "--") {
		return undefined;
	} else {
		let colour: PieceColour = getColourFromString(squareString[0]);
		let type: PieceType = getPieceTypeFromString(squareString[1]);
		return { colour, type };
	}
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

	// if (pieceTypeString === "P") {
	// 	return "pawn";
	// } else if (pieceTypeString === "R") {
	// 	return "rook";
	// } else if (pieceTypeString === "N") {
	// 	return "knight";
	// } else if (pieceTypeString === "B") {
	// 	return "bishop";
	// } else if (pieceTypeString === "Q") {
	// 	return "queen";
	// } else if (pieceTypeString === "K") {
	// 	return "king";
	// } else {
	// 	throw new Error("piece should have a type");
	// }
}
