import { getStartingBoard } from "../src/board";
import { position } from "../src/position";
import { getGame, delay } from "./testHelpers";
import { Game } from "../src/game";

test("make moves and check time", async () => {
	let game = getGame(getStartingBoard(), 45, 45, "white", "FAKEID");
	game = game.makeMove(position("e2"), position("e4")); // white
	game = game.makeMove(position("e7"), position("e5")); // black
	await delay(2000);
	game = game.makeMove(position("d2"), position("d4")); // white
	expect(game.whiteTime).toBeLessThan(44);

	game = Game.fromJson(game.toJsonString()); // serialise and deserialise
	expect(game.whiteTime).toBeLessThan(44);

	await delay(2000);
	game = game.makeMove(position("d7"), position("d5")); // black
	game = Game.fromJson(game.toJsonString()); // serialise and deserialise
	expect(game.whiteTime).toBeLessThan(44);
	expect(game.blackTime).toBeLessThan(44);

	await delay(2000);
	game = game.makeMove(position("c2"), position("c4")); // white
	game = Game.fromJson(game.toJsonString()); // serialise and deserialise
	expect(game.whiteTime).toBeLessThan(44);
	expect(game.blackTime).toBeLessThan(44);
}, 10000 /*10s timeout */);

test("make moves and check time from game state", async () => {
	let game = getGame(getStartingBoard(), 45, 45, "white", "FAKEID");
	game = game.makeMove(position("e2"), position("e4")); // white
	game = game.makeMove(position("e7"), position("e5")); // black
	await delay(2000);
	game = game.makeMove(position("d2"), position("d4")); // white
	game = game.makeMove(position("d7"), position("d5")); // black
	expect(game.whiteTime).toBeLessThan(44);
	expect(game.whiteTime).toBeGreaterThan(42);

	const gameState = game.toJsonString();
	await delay(2000);
	expect(game.whiteTime).toBeLessThan(42);

	game = Game.fromJson(gameState);
	expect(game.whiteTime).toBeLessThan(42);
}, 10000 /*10s timeout */);

test("make moves and check time from game state when time is zero", async () => {
	let game = getGame(getStartingBoard(), 2, undefined, "white", "FAKEID");
	game = game.makeMove(position("e2"), position("e4")); // white
	game = game.makeMove(position("e7"), position("e5")); // black
	await delay(2000);
	expect(game.whiteTime).toBeLessThanOrEqual(0);

	const gameState = game.toJsonString();
	game = Game.fromJson(gameState);

	expect(game.whiteTime).toBeLessThanOrEqual(0);
}, 10000 /*10s timeout */);
