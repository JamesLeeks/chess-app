import { parseBoard } from "../board";
import { position, toNotations } from "../position";
import { getGame } from "./testHelpers";

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
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["b8", "c7", "d6", "f4", "g3", "h2", "a1", "b2", "c3", "d4", "f6", "g7", "h8"];
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
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["c3", "d4", "d6", "f4", "f6"];
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
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["c3", "d4", "d6", "f4", "f6", /*captures*/ "b2", "c7", "g3", "g7"];
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
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["b8", "c7", "d6", "f4", "g3", "h2", "a1", "b2", "c3", "d4", "f6", "g7", "h8"];
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
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = ["c3", "d4", "d6", "f4", "f6"];
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
	-- -- -- -- -- BK -- WK
	`);
	const game = getGame(initialBoard);
	const moveOptions = toNotations(...game.getMoveOptions(position("e5")));
	const expectedMoveOptions: string[] = [/*moves*/ "c3", "d4", "d6", "f4", "f6", /*captures*/ "b2", "c7", "g3", "g7"];
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});
