import { parseBoard } from "./board";
import { position } from "./position";
import { getGame } from "./testHelpers";

test("h8=Q", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- BK -- WK
	`);
	const expectedTo = position("h8");
	const expectedFrom = position("h7");
	const expectedString = "h8=Q";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("h8"), "queen");
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

test("hxg8=Q", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- BN --
	-- -- -- -- -- -- -- WP
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const expectedTo = position("g8");
	const expectedFrom = position("h7");
	const expectedString = "hxg8=Q";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h7"), position("g8"), "queen");
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

test("h5", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- WP
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const expectedTo = position("h5");
	const expectedFrom = position("h4");
	const expectedString = "h5";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h4"), position("h5"));
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

test("hxg5", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- BP --
	-- -- -- -- -- -- -- WP
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- WK -- BK
	`);
	const expectedTo = position("g5");
	const expectedFrom = position("h4");
	const expectedString = "hxg5";
	const game = getGame(initialBoard);
	const newGame = game.makeMove(position("h4"), position("g5"));
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
