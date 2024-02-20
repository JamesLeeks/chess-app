import { getMoveOptions } from "./getMoveOptions";
import { getStartingBoard, parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

// white knight
test("white knight in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WN -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white knight blocked", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- WP -- WP -- --
    -- -- WP -- -- -- WP --
    -- -- -- -- WN -- -- --
    -- -- WP -- -- -- WP --
    -- -- -- WP -- WP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	expect(moveOptions).toEqual([]);
});

test("white knight captures", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- BP -- BP -- --
    -- -- BP -- -- -- BP --
    -- -- -- -- WN -- -- --
    -- -- BP -- -- -- BP --
    -- -- -- BP -- BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white knight starting position, right side", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions(position("g1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("f3", "h3");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// black knight
test("black knight in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- BN -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black knight blocked", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- BP -- BP -- --
    -- -- BP -- -- -- BP --
    -- -- -- -- BN -- -- --
    -- -- BP -- -- -- BP --
    -- -- -- BP -- BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	expect(moveOptions).toEqual([]);
});

test("black knight captures", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- WP -- WP -- --
    -- -- WP -- -- -- WP --
    -- -- -- -- BN -- -- --
    -- -- WP -- -- -- WP --
    -- -- -- WP -- WP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black knight starting position, left side", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions(position("b8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a6", "c6");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
