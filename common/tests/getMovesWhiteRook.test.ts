import { parseBoard } from "../src/board";
import { position, toNotations } from "../src/position";
import { getGame } from "./testHelpers";

test("white rook forward moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR WN -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a1")));
	const expectedMoveOptions: string[] = ["a2", "a3", "a4", "a5", "a6", "a7", "a8"];
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
	WR WN -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a1")));
	const expectedMoveOptions: string[] = ["a2", "a3", "a4", "a5", "a6"];
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
	WR WN -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a1")));
	const expectedMoveOptions: string[] = ["a2", "a3", "a4", "a5", "a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook backward moves", () => {
	const initialBoard = parseBoard(`
	WR WN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook backward blocked", () => {
	const initialBoard = parseBoard(`
	WR WN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook backward capture", () => {
	const initialBoard = parseBoard(`
	WR WN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BN -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook right moves", () => {
	const initialBoard = parseBoard(`
	WR -- -- -- -- -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["b8", "c8", "d8", "e8", "f8", "g8", "h8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook right blocked", () => {
	const initialBoard = parseBoard(`
	WR -- -- -- WN -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["b8", "c8", "d8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook right capture", () => {
	const initialBoard = parseBoard(`
	WR -- -- -- BN -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["b8", "c8", "d8", "e8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook left moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- WR
	-- -- -- -- -- -- -- WN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h8")));
	const expectedMoveOptions: string[] = ["a8", "b8", "c8", "d8", "e8", "f8", "g8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook left blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- WN -- -- -- WR
	-- -- -- -- -- -- -- WN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h8")));
	const expectedMoveOptions: string[] = ["e8", "f8", "g8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white rook left capture", () => {
	const initialBoard = parseBoard(`
	-- -- -- BN -- -- -- WR
	-- -- -- -- -- -- -- WN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h8")));
	const expectedMoveOptions: string[] = ["d8", "e8", "f8", "g8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
