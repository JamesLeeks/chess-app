import { parseBoard } from "../src/board";
import { getGame } from "./testHelpers";

test("game still in progress", () => {
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
	expect(game.getGameResult()).toEqual(undefined);
});

test("black times out and white has two bishops", () => {
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
	const game = getGame(initialBoard, 600, 0);
	expect(game.getGameResult()).toEqual({ reason: "blackTimeOut", result: "whiteWins" });
});

test("black times out and white has a bishop and knight", () => {
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
	const game = getGame(initialBoard, 600, 0);
	expect(game.getGameResult()).toEqual({ reason: "blackTimeOut", result: "whiteWins" });
});

test("black times out and white has a rook", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WR -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard, 600, 0);
	expect(game.getGameResult()).toEqual({ reason: "blackTimeOut", result: "whiteWins" });
});

test("black times out and white has a queen", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WQ -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard, 600, 0);
	expect(game.getGameResult()).toEqual({ reason: "blackTimeOut", result: "whiteWins" });
});

test("black times out and white has a pawn", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- WP -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard, 600, 0);
	expect(game.getGameResult()).toEqual({ reason: "blackTimeOut", result: "whiteWins" });
});

test("black times out and white has two knights", () => {
	const initialBoard = parseBoard(`
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- WN WN -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- BK -- WK
    `);
	const game = getGame(initialBoard, 600, 0);
	expect(game.getGameResult()).toEqual({ reason: "blackTimeOut", result: "whiteWins" });
});

test("black in checkmate", () => {
	const initialBoard = parseBoard(`
    WK -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
    WR -- -- -- -- -- -- --
    -- WR -- -- -- BK -- --
    `);
	const game = getGame(initialBoard, 600, 600, "black");
	expect(game.getGameResult()).toEqual({ reason: "blackInCheckmate", result: "whiteWins" });
});
