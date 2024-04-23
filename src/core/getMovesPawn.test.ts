import { getStartingBoard, parseBoard, boardToString } from "./board";
import { position, toNotations } from "./position";
import { getGame } from "./testHelpers";

test("black pawn starting position", () => {
	const initialBoard = getStartingBoard();
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("b7")));
	const expectedMoveOptions: string[] = ["b6", "b5"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white pawn starting position", () => {
	const initialBoard = getStartingBoard();
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("b2")));
	const expectedMoveOptions: string[] = ["b3", "b4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white pawn starting position, left edge", () => {
	const initialBoard = getStartingBoard();
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a2")));
	const expectedMoveOptions: string[] = ["a3", "a4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white pawn after 1 move", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- WP -- -- -- -- -- --
	WP -- WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("b3")));
	const expectedMoveOptions: string[] = ["b4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black pawn after 1 move", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP -- BP BP BP BP BP BP
	-- BP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("b6")));
	const expectedMoveOptions: string[] = ["b5"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white pawn capture test", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	-- BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	BP -- -- -- -- -- -- --
	-- WP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WP -- WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("b4")));
	const expectedMoveOptions: string[] = ["a5", "b5"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black pawn capture test", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	-- BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	BP -- -- -- -- -- -- --
	-- WP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WP -- WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("a5")));
	const expectedMoveOptions: string[] = ["b4", "a4"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("pawn blocked by piece", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP -- BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- BP -- -- -- --
	-- -- -- WP -- -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP -- WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("d4")));
	const expectedMoveOptions: string[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("home row pawn second move blocked", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP -- BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- BP -- -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("d2")));
	const expectedMoveOptions: string[] = ["d3"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("home row pawn both moves blocked", () => {
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP -- BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- BP -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("d2")));
	const expectedMoveOptions: string[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// en passant

test("white pawn en passant right", () => {
	// set initial board
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- WP -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP -- WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);

	// set game with initial board
	let game = getGame(initialBoard);

	// make a move for black
	game = game.makeMove(position("e7"), position("e5"));

	const boardAfterMoveString = boardToString(game.board);
	expect(boardAfterMoveString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- WP BP -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP -- WP WP WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);

	// get move options
	const moveOptions = toNotations(...game.getMoveOptions(position("d5")));

	// set expected move options
	const expectedMoveOptions: string[] = ["d6", "e6"];

	// check move options against expected move options
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);

	// make a move for white
	game = game.makeMove(position("d5"), position("e6"));

	const boardAfterMoveTwoString = boardToString(game.board);
	expect(boardAfterMoveTwoString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- WP -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP -- WP WP WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);
});

test("white pawn en passant left", () => {
	// set initial board
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP BP BP BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- WP -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP -- WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);

	// set game with initial board
	let game = getGame(initialBoard);

	// make a move for black
	game = game.makeMove(position("c7"), position("c5"));

	const boardAfterMoveOneString = boardToString(game.board);
	expect(boardAfterMoveOneString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP -- BP BP BP BP BP
-- -- -- -- -- -- -- --
-- -- BP WP -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP -- WP WP WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);

	// get move options
	const moveOptions = toNotations(...game.getMoveOptions(position("d5")));

	// set expected move options
	const expectedMoveOptions: string[] = ["d6", "c6"];

	// check move options against expected move options
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);

	// make a move for white
	game = game.makeMove(position("d5"), position("c6"));

	const boardAfterMoveTwoString = boardToString(game.board);
	expect(boardAfterMoveTwoString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP -- BP BP BP BP BP
-- -- WP -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
WP WP WP -- WP WP WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);
});

test("black pawn en passant left", () => {
	// set initial board
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP BP -- BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- BP -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);

	// set game with initial board
	let game = getGame(initialBoard);

	// make a move for black
	game = game.makeMove(position("d2"), position("d4"));

	const boardAfterMoveOneString = boardToString(game.board);
	expect(boardAfterMoveOneString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- WP BP -- -- --
-- -- -- -- -- -- -- --
WP WP WP -- WP WP WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);

	// get move options
	const moveOptions = toNotations(...game.getMoveOptions(position("e4")));

	// set expected move options
	const expectedMoveOptions: string[] = ["d3", "e3"];

	// check move options against expected move options
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);

	// make a move for white
	game = game.makeMove(position("e4"), position("d3"));

	const boardAfterMoveTwoString = boardToString(game.board);
	expect(boardAfterMoveTwoString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- BP -- -- -- --
WP WP WP -- WP WP WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);
});

test("black pawn en passant right", () => {
	// set initial board
	const initialBoard = parseBoard(`
	BR BN BB BQ BK BB BN BR
	BP BP BP BP -- BP BP BP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- BP -- -- --
	-- -- -- -- -- -- -- --
	WP WP WP WP WP WP WP WP
	WR WN WB WQ WK WB WN WR
	`);

	// set game with initial board
	let game = getGame(initialBoard);

	// make a move for black
	game = game.makeMove(position("f2"), position("f4"));

	const boardAfterMoveOneString = boardToString(game.board);
	expect(boardAfterMoveOneString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- BP WP -- --
-- -- -- -- -- -- -- --
WP WP WP WP WP -- WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);

	// get move options
	const moveOptions = toNotations(...game.getMoveOptions(position("e4")));

	// set expected move options
	const expectedMoveOptions: string[] = ["f3", "e3"];

	// check move options against expected move options
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);

	// make a move for white
	game = game.makeMove(position("e4"), position("f3"));

	const boardAfterMoveTwoString = boardToString(game.board);
	expect(boardAfterMoveTwoString).toEqual(
		`
BR BN BB BQ BK BB BN BR
BP BP BP BP -- BP BP BP
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- BP -- --
WP WP WP WP WP -- WP WP
WR WN WB WQ WK WB WN WR
`.trimStart()
	);
});
