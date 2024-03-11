import { parseBoard } from "./board";
import { getMoveOptions } from "./getMoveOptions";
import { isInCheck } from "./isInCheck";
import { position, toNotations } from "./position";

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
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
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
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	expect(moveOptions).toEqual([]);
});

test("white bishop pinned", () => {
	const initialBoard = parseBoard(`
    BK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WK WB -- BR --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e4"), initialBoard);
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
	const moveOptions = toNotations(...getMoveOptions(position("e5"), initialBoard));
	expect(moveOptions).toIncludeSameMembers(["f6", "g7"]);
});
