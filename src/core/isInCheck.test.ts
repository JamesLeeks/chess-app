import { parseBoard } from "./board";
import { isInCheck } from "./isInCheck";
import { position, toNotations } from "./position";
import { getGame } from "./testHelpers";

// CHECKS
test("white king in check from black bishop", () => {
	const board = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- BB --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white");
	expect(isCheck).toEqual(true);
});

test("white king in check from black pawn", () => {
	const board = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- BP -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white");
	expect(isCheck).toEqual(true);
});

test("white king blocking black pawn but not in check", () => {
	const board = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- BP -- -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white");
	expect(isCheck).toEqual(false);
});

test("white king in check from black rook", () => {
	const board = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WK -- -- -- BR
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white");
	expect(isCheck).toEqual(true);
});

test("white king in check from pinned piece", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- BK
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- BN
    -- -- -- -- -- WK -- WR
    `);
	const game = getGame(initialBoard);
	const isCheck = isInCheck(game.board, "white");
	expect(isCheck).toEqual(true);
});

// PINS
test("white pawn pinned", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- BB --
    -- -- -- -- -- -- -- --
    -- -- -- -- WP -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- BK -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = game.getMoveOptions(position("e5"));
	expect(moveOptions).toEqual([]);
});

test("white rook pinned", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- BB --
    -- -- -- -- -- -- -- --
    -- -- -- -- WR -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = game.getMoveOptions(position("e5"));
	expect(moveOptions).toEqual([]);
});

test("white bishop pinned", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WK WB -- BR --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = game.getMoveOptions(position("e4"));
	expect(moveOptions).toEqual([]);
});

test("white queen pinned", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- BB --
    -- -- -- -- -- -- -- --
    -- -- -- -- WQ -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	expect(moveOptions).toIncludeSameMembers(["f6", "g7"]);
});
