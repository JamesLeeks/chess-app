import { boardToString, getBoardAfterMove, parseBoard } from "./board";
import { position, toNotations } from "./position";
import { getGame } from "./testHelpers";

// TODO: add more tests
// include: 1r5k/8/8/8/8/8/8/R3K3 w Q - 1 1

// castling bug
test("both sides can castle right", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- BR
	-- -- -- -- BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- WP WP WP WP 
	-- -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "d2", "f1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("both sides can castle left", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- BK -- -- --
	BP BP BP BP BP -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP -- -- --
	WR -- -- -- WK -- -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["c1", "d1", "f1", "f2"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white can castle left, black can castle right", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- BR
	-- -- -- -- BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP -- -- --
	WR -- -- -- WK -- -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["c1", "d1", "f1", "f2"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white can castle right, black can castle left", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- BK -- -- --
	BP BP BP BP BP -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- WP WP WP WP
	-- -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "d2", "f1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white and black can both castle right and left", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- BK -- -- BR
	BP BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["c1", "d1", "f1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

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
test("white cannot castle right because the black king controls the squares", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WP WP -- BK --
	-- -- -- WP WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle right because pieces block the path A", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- -- WK WB -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "c1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle right because pieces block the path B", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- -- WK -- WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1", "c1", "f1"];
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
test("white cannot castle left because the black king controls the squares", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- BK -- WP WP -- --
	WR -- -- -- WK WP -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because pieces block the path A", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- -- WQ WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["f1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because pieces block the path B", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR -- WB -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["f1", "g1", "d1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because pieces block the path C", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- BK -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN -- -- WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["f1", "g1", "d1"];
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
	const expectedMoveOptions: string[] = ["f1", "g1"];
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
	const expectedMoveOptions: string[] = ["d1", "f1", "g1"];
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
	const expectedMoveOptions: string[] = ["d1", "f1", "g1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// Check that castling works
test("check castling right", () => {
	const initialBoard = parseBoard(`
	BK -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- WP WP WP WP WP
	-- -- -- WP WK -- -- WR
	`);
	const game = getGame(initialBoard);
	game.makeMove(position("e1"), position("g1"));
	const boardAfterMove = getBoardAfterMove(game.board, position("e1"), position("g1"));
	expect(boardToString(boardAfterMove)).toEqual(
		`
BK -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- WP WP WP WP WP
-- -- -- WP -- WR WK --
`.trimStart()
	);
});

test("check castling left", () => {
	const initialBoard = parseBoard(`
	BK -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	WP WP WP WP WP WP -- --
	WR -- -- -- WK WP -- --
	`);
	const game = getGame(initialBoard);
	game.makeMove(position("e1"), position("c1"));
	const boardAfterMove = getBoardAfterMove(game.board, position("e1"), position("c1"));
	expect(boardToString(boardAfterMove)).toEqual(
		`
BK -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP WP WP WP -- --
-- -- WK WR -- WP -- --
`.trimStart()
	);
});

// Edge cases
test("white cannot castle right because they would be in check even though the square is not under threat currently", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- BK
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- BN
	-- -- -- WP WP WP -- --
	-- -- -- WP WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["f1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle right because they pass through a square check even though the square is not under threat currently", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- BK
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- WP WP WP -- BN
	-- -- -- WP WK -- -- WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white cannot castle left because they would be in check even though the square is not under threat currently", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BK -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	BN -- WP WP WP WP -- --
	WR -- -- -- WK WP -- --
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e1")));
	const expectedMoveOptions: string[] = ["d1"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
