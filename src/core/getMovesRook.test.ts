import { getMoveOptions } from "./getMoveOptions";
import { parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

test("white rook forward moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR WN -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a2", "a3", "a4", "a5", "a6", "a7", "a8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook forward blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR WN -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a2", "a3", "a4", "a5", "a6");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook forward capture", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR WN -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a2", "a3", "a4", "a5", "a6", "a7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
