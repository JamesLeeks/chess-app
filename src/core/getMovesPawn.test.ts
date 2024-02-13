import { getMoveOptions } from "./getMoveOptions";
import { getStartingBoard, parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

test("black pawn starting position", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions(position("b7"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b6", "b5");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white pawn starting position", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions(position("b2"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b3", "b4");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white pawn starting position, left edge", () => {
	const initialBoard = getStartingBoard();
	const moveOptions = getMoveOptions(position("a2"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a3", "a4");
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
	const moveOptions = getMoveOptions(position("b3"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b4");
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
	const moveOptions = getMoveOptions(position("b6"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b5");
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
	const moveOptions = getMoveOptions(position("b4"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a5", "b5");
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
	const moveOptions = getMoveOptions(position("a5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b4", "a4");
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
	const moveOptions = getMoveOptions(position("d4"), initialBoard);
	const expectedMoveOptions: Position[] = [];
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
	const moveOptions = getMoveOptions(position("d2"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d3");
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
	const moveOptions = getMoveOptions(position("d2"), initialBoard);
	const expectedMoveOptions: Position[] = [];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
