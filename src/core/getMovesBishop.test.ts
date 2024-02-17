import { getMoveOptions } from "./getMoveOptions";
import { parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

// white bishop
test("white bishop in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WB -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
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
		"h8"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white bishop blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- WP -- -- -- WP --
	-- -- -- -- -- -- -- --
	-- -- -- -- WB -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- WP --
	-- WP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("c3", "d4", "d6", "f4", "f6");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("white bishop captures", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- BP -- -- -- BP --
	-- -- -- -- -- -- -- --
	-- -- -- -- WB -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- BP --
	-- BP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("c3", "d4", "d6", "f4", "f6", /*captures*/ "b2", "c7", "g3", "g7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

// black bishop
test("black bishop in center", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- BB -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    `);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions(
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
		"h8"
	);
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black bishop blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- BP -- -- -- BP --
	-- -- -- -- -- -- -- --
	-- -- -- -- BB -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- BP --
	-- BP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("c3", "d4", "d6", "f4", "f6");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black bishop captures", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- WP -- -- -- WP --
	-- -- -- -- -- -- -- --
	-- -- -- -- BB -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- WP --
	-- WP -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("e5"), initialBoard);
	const expectedMoveOptions: Position[] = positions("c3", "d4", "d6", "f4", "f6", /*captures*/ "b2", "c7", "g3", "g7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
