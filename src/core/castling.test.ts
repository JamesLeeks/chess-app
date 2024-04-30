import { boardToString, parseBoard } from "./board";
import { position, toNotations } from "./position";
import { getGame } from "./testHelpers";

// TODO: add more tests

// white can castle both sides
test("white can castle both sides", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1", "c1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// white cannot castle either side
test("white cannot castle because the king is in check", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- BB
    -- -- -- -- -- WP -- --
	WP WP WP WP WP -- WP WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle because the king has moved", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- WK -- -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("d1")));
	const expectedMoveOptions: string[] = ["c1", "e1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle because the king has moved before", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- WK -- -- -- WR
	`);
	let game = getGame(initialBoard);
	game = game.makeMove(position("d1"), position("e1"));
	const boardAfterMoveString = boardToString(game.board);
	expect(boardAfterMoveString).toEqual(
		`
-- -- -- -- BK -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP WP WP WP WP
WR -- -- -- WK -- -- WR
`.trimStart()
	);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle because both rooks have moved", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	-- -- -- -- WK -- -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle because both rooks have moved before", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WR WP WP WP WP WP WP WR
	-- -- -- -- WK -- -- --
	`);
	let game = getGame(initialBoard);
	game = game.makeMove(position("h2"), position("h1"));
	const boardAfterMoveString = boardToString(game.board);
	expect(boardAfterMoveString).toEqual(
		`
-- -- -- -- BK -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WR WP WP WP WP WP WP --
-- -- -- -- WK -- -- WR
`.trimStart()
	);
	game = game.makeMove(position("a2"), position("a1"));
	const boardAfterMoveTwoString = boardToString(game.board);
	expect(boardAfterMoveTwoString).toEqual(
		`
-- -- -- -- BK -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- WP WP WP WP WP WP --
WR -- -- -- WK -- -- WR
`.trimStart()
	);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle either side because pieces block the path", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle either side because the path is threatened by an opponent's piece A", () => {
	const initialBoard = parseBoard(`
	-- -- BR -- BK BR -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP -- WP WP -- WP WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle either side because the path is threatened by an opponent's piece B", () => {
	const initialBoard = parseBoard(`
	-- -- -- BR BK -- BR --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP -- WP WP -- WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// white cannot castle right
test("white cannot castle right because pieces block the path", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- -- WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle right because the path is threatened by an opponent's piece A", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK BR -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP -- WP WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle right because the path is threatened by an opponent's piece B", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- BR --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP -- WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle right because the rook on that side has moved", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- -- WK -- -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// white cannot castle left
test("white cannot castle left because pieces block the path", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["f1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because the path is threatened by an opponent's piece A", () => {
	const initialBoard = parseBoard(`
	-- -- -- BR BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP -- WP WP WP WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because the path is threatened by an opponent's piece B", () => {
	const initialBoard = parseBoard(`
	-- -- BR -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP -- WP WP WP -- WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because the rook on that side has moved", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	-- -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "f1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
