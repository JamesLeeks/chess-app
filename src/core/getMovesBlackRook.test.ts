import { parseBoard } from "./board";
import { position, toNotations } from "./position";
import { getGame } from "./testHelpers";

test("black rook checking white king", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- WK -- -- -- -- BR
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BK -- -- -- -- -- -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h5")));
	const expectedMoveOptions: string[] = ["c5", "d5", "e5", "f5", "g5", "h1", "h2", "h3", "h4", "h6", "h7", "h8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook forward moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BR BN -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a1")));
	const expectedMoveOptions: string[] = ["a2", "a3", "a4", "a5", "a6", "a7", "a8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook forward blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BR BN -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a1")));
	const expectedMoveOptions: string[] = ["a2", "a3", "a4", "a5", "a6"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook forward capture", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BR BN -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a1")));
	const expectedMoveOptions: string[] = ["a2", "a3", "a4", "a5", "a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook backward moves", () => {
	const initialBoard = parseBoard(`
	BR BN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook backward blocked", () => {
	const initialBoard = parseBoard(`
	BR BN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook backward capture", () => {
	const initialBoard = parseBoard(`
	BR BN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WN -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook right moves", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["b8", "c8", "d8", "e8", "f8", "g8", "h8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook right blocked", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- BN -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["b8", "c8", "d8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook right capture", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- WN -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a8")));
	const expectedMoveOptions: string[] = ["b8", "c8", "d8", "e8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook left moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- BR
	-- -- -- -- -- -- -- BN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h8")));
	const expectedMoveOptions: string[] = ["a8", "b8", "c8", "d8", "e8", "f8", "g8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook left blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- BN -- -- -- BR
	-- -- -- -- -- -- -- BN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h8")));
	const expectedMoveOptions: string[] = ["e8", "f8", "g8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook left capture", () => {
	const initialBoard = parseBoard(`
	-- -- -- WN -- -- -- BR
	-- -- -- -- -- -- -- BN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("h8")));
	const expectedMoveOptions: string[] = ["d8", "e8", "f8", "g8"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
