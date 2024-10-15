import { boardToString, parseBoard } from "../board";
import { position } from "../position";
import { getGame } from "./testHelpers";

test("history has correct board after move", () => {
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
	const expectedBoard = `
WR -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- WN -- -- -- WK -- BK
`.trimStart();
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const boardAfterMove = newGame.history[0].boardAfterMove;
	const displayBoardAfterMove = boardToString(boardAfterMove);
	expect(displayBoardAfterMove).toEqual(expectedBoard);
});

test("history has correct to and from", () => {
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
	const expectedTo = position("a8");
	const expectedFrom = position("a1");
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
});
