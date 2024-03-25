import { getStartingBoard, parseBoard } from "./board";
import { position, toNotations } from "./position";
import { getGame } from "./testHelpers";

// white knight
test("white knight in center", () => {
	const initialBoard = parseBoard(`
    BK -- WK -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WN -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white knight blocked", () => {
	const initialBoard = parseBoard(`
    BK -- WK -- -- -- -- --
    -- -- -- WP -- WP -- --
    -- -- WP -- -- -- WP --
    -- -- -- -- WN -- -- --
    -- -- WP -- -- -- WP --
    -- -- -- WP -- WP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	expect(moveOptions).toEqual([]);
});

test("white knight captures", () => {
	const initialBoard = parseBoard(`
    WK -- BK -- -- -- -- --
    -- -- -- BP -- BP -- --
    -- -- BP -- -- -- BP --
    -- -- -- -- WN -- -- --
    -- -- BP -- -- -- BP --
    -- -- -- BP -- BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white knight starting position, right side", () => {
	const initialBoard = getStartingBoard();
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("g1")));
	const expectedMoveOptions: string[] = ["f3", "h3"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// black knight
test("black knight in center", () => {
	const initialBoard = parseBoard(`
    WK -- BK -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- BN -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black knight blocked", () => {
	const initialBoard = parseBoard(`
    WK -- BK -- -- -- -- --
    -- -- -- BP -- BP -- --
    -- -- BP -- -- -- BP --
    -- -- -- -- BN -- -- --
    -- -- BP -- -- -- BP --
    -- -- -- BP -- BP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	expect(moveOptions).toEqual([]);
});

test("black knight captures", () => {
	const initialBoard = parseBoard(`
    BK -- WK -- -- -- -- --
    -- -- -- WP -- WP -- --
    -- -- WP -- -- -- WP --
    -- -- -- -- BN -- -- --
    -- -- WP -- -- -- WP --
    -- -- -- WP -- WP -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d7", "d3", "f7", "f3", "c6", "c4", "g6", "g4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black knight starting position, left side", () => {
	const initialBoard = getStartingBoard();
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("b8")));
	const expectedMoveOptions: string[] = ["a6", "c6"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
