import { parseBoard } from "./board";
import { position } from "./position";
import { getGame } from "./testHelpers";

test("Ra8", () => {
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
	const expectedString = "Ra8";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	const historyItemString = newGame.history[0].notation;
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
	expect(historyItemString).toEqual(expectedString);
});

test("Rxa8", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- -- -- -- --
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
	const expectedString = "Rxa8";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	const historyItemString = newGame.history[0].notation;
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
	expect(historyItemString).toEqual(expectedString);
});

test("Raa8", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- WR --
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
	const expectedString = "Raa8";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	const historyItemString = newGame.history[0].notation;
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
	expect(historyItemString).toEqual(expectedString);
});

test("R1a5", () => {
	const initialBoard = parseBoard(`
	WR -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR WN -- -- -- WK -- BK
	`);
	const expectedTo = position("a5");
	const expectedFrom = position("a1");
	const expectedString = "R1a5";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a5"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	const historyItemString = newGame.history[0].notation;
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
	expect(historyItemString).toEqual(expectedString);
});

test("Ra8+", () => {
	const initialBoard = parseBoard(`
	-- -- BK -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR WN -- -- -- WK -- --
	`);
	const expectedTo = position("a8");
	const expectedFrom = position("a1");
	const expectedString = "Ra8+";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	const historyItemString = newGame.history[0].notation;
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
	expect(historyItemString).toEqual(expectedString);
});

test("Ra8#", () => {
	const initialBoard = parseBoard(`
	-- -- BK -- -- -- -- --
	-- -- -- -- -- -- -- WR
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WR -- -- -- -- WK -- --
	`);
	const expectedTo = position("a8");
	const expectedFrom = position("a1");
	const expectedString = "Ra8#";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("a1"), position("a8"));
	const to = newGame.history[0].to;
	const from = newGame.history[0].from;
	if (!to || !from) {
		throw new Error("to and from should exist");
	}
	const historyItemString = newGame.history[0].notation;
	expect(to).toEqual(expectedTo);
	expect(from).toEqual(expectedFrom);
	expect(historyItemString).toEqual(expectedString);
});
