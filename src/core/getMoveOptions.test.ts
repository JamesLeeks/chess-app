import { getMoveOptions } from "./getMoveOptions";
import { getStartingBoard } from "./getStartingBoard";
import { Position } from "./models";

test("black pawn starting position", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions("black", { row: 1, column: 1 }, initialBoard);
	const expectedMoveOptions: Position[] = [
		{ row: 2, column: 1 },
		{ row: 3, column: 1 },
	];
	expect(moveOptions).toEqual(expectedMoveOptions);
});

test("white pawn starting position", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions("white", { row: 6, column: 1 }, initialBoard);
	const expectedMoveOptions: Position[] = [
		{ row: 5, column: 1 },
		{ row: 4, column: 1 },
	];
	expect(moveOptions).toEqual(expectedMoveOptions);
});

test("white pawn after 1 move", () => {
	const initialBoard = [
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
		[undefined, { colour: "white", type: "pawn" }, undefined, undefined, undefined, undefined, undefined, undefined],
		[
			{ colour: "white", type: "pawn" },
			undefined,
			{ colour: "white", type: "pawn" },
			{ colour: "white", type: "pawn" },
			{ colour: "white", type: "pawn" },
			{ colour: "white", type: "pawn" },
			{ colour: "white", type: "pawn" },
			{ colour: "white", type: "pawn" },
		],
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
	const moveOptions = getMoveOptions("white", { row: 5, column: 1 }, initialBoard);
	const expectedMoveOptions: Position[] = [{ row: 4, column: 1 }];
	expect(moveOptions).toEqual(expectedMoveOptions);
});
