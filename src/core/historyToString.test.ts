import { getStartingBoard, parseBoard } from "./board";
import { position } from "./position";
import { getGame } from "./testHelpers";

test("check and checkmate", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	BK -- -- -- -- -- -- --
	-- -- -- -- -- -- WR --
	-- -- -- -- -- -- -- WR
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WK
	`);
	const expectedString = "Rh7+ Ka8 Rg8#";
	const game0 = getGame(initialBoard);
	const game1 = game0.makeMove(position("h5"), position("h7"));
	const game2 = game1.makeMove(position("a7"), position("a8"));
	const game3 = game2.makeMove(position("g6"), position("g8"));
	expect(game3.historyToString()).toEqual(expectedString);
});

test("no history", () => {
	const initialBoard = getStartingBoard();
	const expectedString = "";
	const game0 = getGame(initialBoard);
	expect(game0.historyToString()).toEqual(expectedString);
});
