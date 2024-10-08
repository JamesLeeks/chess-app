import { MoveParser, ParsedMove } from "../moveParser";

test("kingside castling", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: undefined,
		fromRow: undefined,
		capture: false,
		toColumn: undefined,
		toRow: undefined,
		promotionType: undefined,
		check: undefined,
		castle: "kingSide",
	};
	expect(MoveParser.parse("O-O")).toEqual(expected);
});

test("queenside castling", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: undefined,
		fromRow: undefined,
		capture: false,
		toColumn: undefined,
		toRow: undefined,
		promotionType: undefined,
		check: undefined,
		castle: "queenSide",
	};
	expect(MoveParser.parse("O-O-O")).toEqual(expected);
});

test("pawn capture with file disambiguation", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: 4,
		fromRow: undefined,
		capture: true,
		toColumn: 3,
		toRow: 3,
		promotionType: undefined,
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("exd5")).toEqual(expected);
});

test("pawn move", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: undefined,
		fromRow: undefined,
		capture: false,
		toColumn: 4,
		toRow: 4,
		promotionType: undefined,
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("e4")).toEqual(expected);
});

test("pawn move that seems to be the problem", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: undefined,
		fromRow: undefined,
		capture: false,
		toColumn: 0,
		toRow: 2,
		promotionType: undefined,
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("a6")).toEqual(expected);
});

test("pawn promotion", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: undefined,
		fromRow: undefined,
		capture: false,
		toColumn: 0,
		toRow: 0,
		promotionType: "queen",
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("a8=Q")).toEqual(expected);
});

test("pawn promotion with capture", () => {
	const expected: ParsedMove = {
		pieceType: undefined,
		fromColumn: 1,
		fromRow: undefined,
		capture: true,
		toColumn: 0,
		toRow: 0,
		promotionType: "queen",
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("bxa8=Q")).toEqual(expected);
});

test("bishop capture with rank and file disambiguation", () => {
	const expected: ParsedMove = {
		pieceType: "bishop",
		fromColumn: 4,
		fromRow: 4,
		capture: true,
		toColumn: 3,
		toRow: 3,
		promotionType: undefined,
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("Be4xd5")).toEqual(expected);
});

test("bishop capture with file disambiguation", () => {
	const expected: ParsedMove = {
		pieceType: "bishop",
		fromColumn: 4,
		fromRow: undefined,
		capture: true,
		toColumn: 3,
		toRow: 3,
		promotionType: undefined,
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("Bexd5")).toEqual(expected);
});

test("bishop capture with rank disambiguation", () => {
	const expected: ParsedMove = {
		pieceType: "bishop",
		fromColumn: undefined,
		fromRow: 4,
		capture: true,
		toColumn: 3,
		toRow: 3,
		promotionType: undefined,
		check: undefined,
		castle: undefined,
	};
	expect(MoveParser.parse("B4xd5")).toEqual(expected);
});

test("bishop checks captures with rank and file disambiguation", () => {
	const expected: ParsedMove = {
		pieceType: "bishop",
		fromColumn: 4,
		fromRow: 4,
		capture: true,
		toColumn: 3,
		toRow: 3,
		promotionType: undefined,
		check: "check",
		castle: undefined,
	};
	expect(MoveParser.parse("Be4xd5+")).toEqual(expected);
});

test("bishop checkmates captures with rank and file disambiguation", () => {
	const expected: ParsedMove = {
		pieceType: "bishop",
		fromColumn: 4,
		fromRow: 4,
		capture: true,
		toColumn: 3,
		toRow: 3,
		promotionType: undefined,
		check: "checkmate",
		castle: undefined,
	};
	expect(MoveParser.parse("Be4xd5#")).toEqual(expected);
});
