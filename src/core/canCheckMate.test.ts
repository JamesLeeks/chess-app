import { parseBoard } from "./board";
import { getGame } from "./testHelpers";

test("white can checkmate with two bishops", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WB WB -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard);
	expect(game.sideCanCheckMate("white")).toEqual(true);
});

test("white can checkmate with a knight and a bishop", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WN WB -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard);
	expect(game.sideCanCheckMate("white")).toEqual(true);
});
