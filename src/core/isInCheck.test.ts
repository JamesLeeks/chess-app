import { parseBoard } from "./board";
// import { getMoveOptions } from "./getMoveOptions";
import { isInCheck } from "./isInCheck";
import { position } from "./position";

// CHECKS
test("white king in check from black bishop", () => {
	const board = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- BB --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white", position("d4"));
	expect(isCheck).toEqual(true);
});

test("white king in check from black pawn", () => {
	const board = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- BP -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white", position("d4"));
	expect(isCheck).toEqual(true);
});

test("white king blocking black pawn but not in check", () => {
	const board = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- BP -- -- -- --
    -- -- -- WK -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white", position("d4"));
	expect(isCheck).toEqual(false);
});

test("white king in check from black rook", () => {
	const board = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WK -- -- -- BR
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const isCheck = isInCheck(board, "white", position("d4"));
	expect(isCheck).toEqual(true);
});

// PINS
// test("white pawn pinned", () => {
// 	const initialBoard = parseBoard(`
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- BB --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- WP -- -- --
//     -- -- -- WK -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     `);
// const moveOptions = getMoveOptions(position("e5"), initialBoard);
// 	expect(moveOptions).toEqual([]);
// });

// test("white rook pinned", () => {
// 	const initialBoard = parseBoard(`
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- BB --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- WR -- -- --
//     -- -- -- WK -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     `);
// 	const moveOptions = getMoveOptions(position("e5"), initialBoard);
// 	expect(moveOptions).toEqual([]);
// });

// test("white bishop pinned", () => {
// 	const initialBoard = parseBoard(`
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- WK WB -- BR --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     `);
// 	const moveOptions = getMoveOptions(position("e4"), initialBoard);
// 	expect(moveOptions).toEqual([]);
// });

// test("white queen pinned", () => {
// 	const initialBoard = parseBoard(`
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- BB --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- WQ -- -- --
//     -- -- -- WK -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     -- -- -- -- -- -- -- --
//     `);
// 	const moveOptions = getMoveOptions(position("e5"), initialBoard);
// 	expect(moveOptions).toIncludeSameMembers(["f6", "g7"]);
// });
