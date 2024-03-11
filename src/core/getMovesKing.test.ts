import { getMoveOptions } from "./getMoveOptions";
import { parseBoard } from "./board";
import { Position } from "./models";
import { position, positions, toNotations } from "./position";

test("white king in center", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
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
    BK -- -- -- -- -- -- --
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

test("white king captures up", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- BP BP BP -- --
    -- -- -- -- WK -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = toNotations(...getMoveOptions(position("e5"), initialBoard));
	const expectedMoveOptions: string[] = ["d6", "e6", "f6", "d4", "e4", "f4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white king captures down", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WK -- -- --
    -- -- -- BP BP BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d6", "e6", "f6", "d5", "f5", "d4", "e4", "f4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white king captures side", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- BP WK BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = toNotations(...getMoveOptions(position("e5"), initialBoard));
	const expectedMoveOptions: string[] = ["d6", "e6", "f6", "d5", "f5", "d4", "f4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
