import { position, positions, toNotation, toNotations } from "../src/position";

test("position: d4", () => {
	const square = position("d4");
	const expectedSquare = { row: 4, column: 3 };
	expect(square).toEqual(expectedSquare);
});

test("position: g7", () => {
	const square = position("g7");
	const expectedSquare = { row: 1, column: 6 };
	expect(square).toEqual(expectedSquare);
});

test("positions: g7", () => {
	const squares = positions("g7");
	const expectedSquares = [{ row: 1, column: 6 }];
	expect(squares).toEqual(expectedSquares);
});

test("positions: d4, g7", () => {
	const squares = positions("d4", "g7");
	const expectedSquares = [
		{ row: 4, column: 3 },
		{ row: 1, column: 6 },
	];
	expect(squares).toEqual(expectedSquares);
});

test("notation: d4", () => {
	const square = toNotation({ row: 4, column: 3 });
	const expectedSquare = "d4";
	expect(square).toEqual(expectedSquare);
});

test("notation: g7", () => {
	const square = toNotation({ row: 1, column: 6 });
	const expectedSquare = "g7";
	expect(square).toEqual(expectedSquare);
});

test("notations: g7", () => {
	const squares = toNotations({ row: 1, column: 6 });
	const expectedSquares = ["g7"];
	expect(squares).toEqual(expectedSquares);
});

test("notations: d4, g7", () => {
	const squares = toNotations({ row: 4, column: 3 }, { row: 1, column: 6 });
	const expectedSquares = ["d4", "g7"];
	expect(squares).toEqual(expectedSquares);
});
