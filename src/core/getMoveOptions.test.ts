import { getMoveOptions } from "./getMoveOptions";
import { getStartingBoard } from "./getStartingBoard";
import { Position } from "./models";

test("hardcoded move options", () => {
	// const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions("black", { row: 1, column: 1 });
	const expectedMoveOptions: Position[] = [
		{ row: 2, column: 1 },
		{ row: 3, column: 1 },
	];
	expect(moveOptions).toEqual(expectedMoveOptions);
});
