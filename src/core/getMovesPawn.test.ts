import { getStartingBoard, parseBoard } from "./board";
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
