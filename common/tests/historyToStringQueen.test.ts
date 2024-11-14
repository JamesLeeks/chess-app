import { parseBoard } from "../src/board";
import { position } from "../src/position";
import { getGame } from "./testHelpers";

test("Qh8", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("h8");
	const expectedFrom = position("h7");
	const expectedString = "Qh8";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("h8"));
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

test("Qh8+", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BK -- -- -- -- WK -- --
	`);
	const expectedTo = position("h8");
	const expectedFrom = position("h7");
	const expectedString = "Qh8+";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("h8"));
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

test("Qh8#", () => {
	const initialBoard = parseBoard(`
	-- WR -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WR
	BK -- -- -- -- WK -- --
	`);
	const expectedTo = position("h8");
	const expectedFrom = position("h7");
	const expectedString = "Qh8#";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("h8"));
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

test("Qhh8", () => {
	const initialBoard = parseBoard(`
	WQ -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("h8");
	const expectedFrom = position("h7");
	const expectedString = "Qhh8";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("h8"));
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

test("Qhh8 two", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- WQ -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- BK -- -- WK -- --
	`);
	const expectedTo = position("h8");
	const expectedFrom = position("h7");
	const expectedString = "Qhh8";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("h8"));
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

test("Qh8h7", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- WQ WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- BN -- -- -- -- --
	-- BK -- -- -- WK -- --
	`);
	const expectedTo = position("h7");
	const expectedFrom = position("h8");
	const expectedString = "Qh8h7";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h8"), position("h7"));
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

test("Q8h7", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WQ
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- BN -- -- -- -- --
	-- BK -- -- -- WK -- --
	`);
	const expectedTo = position("h7");
	const expectedFrom = position("h8");
	const expectedString = "Q8h7";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h8"), position("h7"));
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
