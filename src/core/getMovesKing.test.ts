import { getMoveOptions } from "./getMoveOptions";
import { parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

test("white king in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WK -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d6", "e6", "f6", "d5", "f5", "d4", "e4", "f4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white king blocked", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WP WP WP -- --
    -- -- -- WP WK WP -- --
    -- -- -- WP WP WP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	expect(moveOptions).toEqual([]);
});

test("white king captures", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- BP BP BP -- --
    -- -- -- BP WK BP -- --
    -- -- -- BP BP BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d6", "e6", "f6", "d5", "f5", "d4", "e4", "f4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
