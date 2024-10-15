import { parseBoard } from "../board";
import { position } from "../position";
import { getGame } from "./testHelpers";

test("Ne4", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- WN --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("e4");
	const expectedFrom = position("g5");
	const expectedString = "Ne4";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("g5"), position("e4"));
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

test("Nxe4", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- WN --
	-- -- -- -- BP -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("e4");
	const expectedFrom = position("g5");
	const expectedString = "Nxe4";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("g5"), position("e4"));
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

test("Nge4", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- WN -- -- -- WN --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("e4");
	const expectedFrom = position("g5");
	const expectedString = "Nge4";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("g5"), position("e4"));
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

test("N5e4", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- WN --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- WN --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("e4");
	const expectedFrom = position("g5");
	const expectedString = "N5e4";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("g5"), position("e4"));
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

test("Ng5e4", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- WN -- -- -- WN --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- WN --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("e4");
	const expectedFrom = position("g5");
	const expectedString = "Ng5e4";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("g5"), position("e4"));
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
