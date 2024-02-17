import { getMoveOptions } from "./getMoveOptions";
import { parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

// white queen
test("white queen in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WQ -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
		// bishop moves
		"b8",
		"c7",
		"d6",
		"f4",
		"g3",
		"h2",
		"a1",
		"b2",
		"c3",
		"d4",
		"f6",
		"g7",
		"h8",
		// rook moves
		"a5",
		"b5",
		"c5",
		"d5",
		"f5",
		"g5",
		"h5",
		"e1",
		"e2",
		"e3",
		"e4",
		"e6",
		"e7",
		"e8"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white queen blocked", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- WP -- WP -- WP --
    -- -- -- -- -- -- -- --
    -- WP -- -- WQ -- WP --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- WP --
    -- WP -- -- WP -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
		// bishop moves
		"d6",
		"f4",
		"c3",
		"d4",
		"f6",
		// rook moves
		"c5",
		"d5",
		"f5",
		"e3",
		"e4",
		"e6"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white queen captures", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- BP -- BP -- BP --
    -- -- -- -- -- -- -- --
    -- BP -- -- WQ -- BP --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- BP --
    -- BP -- -- BP -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
		// bishop moves
		"b2",
		"b5",
		"c7",
		"e2",
		"e7",
		"g7",
		"g5",
		"g3",
		"d6",
		"f4",
		"c3",
		"d4",
		"f6",
		// rook moves
		"c5",
		"d5",
		"f5",
		"e3",
		"e4",
		"e6"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// black queen
test("black queen in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- BQ -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
		// bishop moves
		"b8",
		"c7",
		"d6",
		"f4",
		"g3",
		"h2",
		"a1",
		"b2",
		"c3",
		"d4",
		"f6",
		"g7",
		"h8",
		// rook moves
		"a5",
		"b5",
		"c5",
		"d5",
		"f5",
		"g5",
		"h5",
		"e1",
		"e2",
		"e3",
		"e4",
		"e6",
		"e7",
		"e8"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black queen blocked", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- BP -- BP -- BP --
    -- -- -- -- -- -- -- --
    -- BP -- -- BQ -- BP --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- BP --
    -- BP -- -- BP -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
		// bishop moves
		"d6",
		"f4",
		"c3",
		"d4",
		"f6",
		// rook moves
		"c5",
		"d5",
		"f5",
		"e3",
		"e4",
		"e6"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black queen captures", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- WP -- WP -- WP --
    -- -- -- -- -- -- -- --
    -- WP -- -- BQ -- WP --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- WP --
    -- WP -- -- WP -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
		// bishop moves
		"b2",
		"b5",
		"c7",
		"e2",
		"e7",
		"g7",
		"g5",
		"g3",
		"d6",
		"f4",
		"c3",
		"d4",
		"f6",
		// rook moves
		"c5",
		"d5",
		"f5",
		"e3",
		"e4",
		"e6"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
