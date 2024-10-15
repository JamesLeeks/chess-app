import { Position } from "./models";

export function position(squareString: string): Position {
	const file = squareString[0];
	const rank = squareString[1];

	const files = "abcdefgh";
	const column = files.indexOf(file);

	const row = 8 - parseInt(rank);

	return { row, column };
}

export function positions(...squareStrings: string[]): Position[] {
	return squareStrings.map((s) => position(s));
}

// takes in a position and returns it as a file and rank
export function toNotation(position: Position): string {
	const row = position.row;
	const column = position.column;
	const files = "abcdefgh";

	const rank = 8 - row;
	const file = files[column];

	return file + rank;
}

export function toNotations(...positions: Position[]): string[] {
	return positions.map((s) => toNotation(s));
}

export function toNotationSeperate(position: Position) {
	const row = position.row;
	const column = position.column;
	const files = "abcdefgh";

	const rank = 8 - row;
	const file = files[column];

	return { file, rank };
}
