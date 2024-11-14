import { parseBoard } from "../src/board";
import { position, toNotations } from "../src/position";
import { getGame } from "./testHelpers";

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
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d6", "e6", "f6", "d5", "f5", "d4", "e4", "f4"];
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
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
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
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
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
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d6", "e6", "f6", "d5", "f5", "d4", "e4", "f4"];
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
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["d6", "e6", "f6", "d5", "f5", "d4", "f4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white king cannot move onto squares controlled by the black king", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- BK --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- WK --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("g1")));
	const expectedMoveOptions: string[] = ["h1", "f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black king cannot move onto squares controlled by the white king", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- WK --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- BK --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("g1")));
	const expectedMoveOptions: string[] = ["h1", "f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
