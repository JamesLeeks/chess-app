import { getStartingBoard } from "../board";
import { Game } from "../game";
import { compareHistories, getGame } from "./testHelpers";

test("2 move game history test", () => {
	const initialBoard = getStartingBoard();
	const gameA = getGame(initialBoard);
	const historyString = "f3 e6 g4 Qh4#";
	const gameFromString = Game.getGameFromString(historyString);
	const gameB = gameA.makeMove({ row: 6, column: 5 }, { row: 5, column: 5 });
	const gameC = gameB.makeMove({ row: 1, column: 4 }, { row: 2, column: 4 });
	const gameD = gameC.makeMove({ row: 6, column: 6 }, { row: 4, column: 6 });
	const gameE = gameD.makeMove({ row: 0, column: 3 }, { row: 4, column: 7 });
	compareHistories(gameFromString.history, gameE.history);
	expect(gameE.historyToString()).toEqual(historyString);
});

test("check and en passant test", () => {
	const initialBoard = getStartingBoard();
	const gameA = getGame(initialBoard);
	const historyString = "f4 e5 f5 Qh4+ g3 g5 fxg6";
	const gameFromString = Game.getGameFromString(historyString);
	const gameB = gameA
		.makeMove({ row: 6, column: 5 }, { row: 4, column: 5 }) /* f4 */
		.makeMove({ row: 1, column: 4 }, { row: 3, column: 4 }) /* e5 */
		.makeMove({ row: 4, column: 5 }, { row: 3, column: 5 }) /* f5 */
		.makeMove({ row: 0, column: 3 }, { row: 4, column: 7 }) /* Qh4+ */
		.makeMove({ row: 6, column: 6 }, { row: 5, column: 6 }) /* g3 */
		.makeMove({ row: 1, column: 6 }, { row: 3, column: 6 }) /* g5 */
		.makeMove({ row: 3, column: 5 }, { row: 2, column: 6 }); /* fxg6 */
	compareHistories(gameFromString.history, gameB.history);
	expect(gameB.historyToString()).toEqual(historyString);
});

test("castling", () => {
	const initialBoard = getStartingBoard();
	const gameA = getGame(initialBoard);
	const historyString = "Nf3 a6 e3 a5 Be2 a4 O-O";
	const gameFromString = Game.getGameFromString(historyString);
	const gameB = gameA
		.makeMove({ row: 7, column: 6 }, { row: 5, column: 5 }) // Nf3
		.makeMove({ row: 1, column: 0 }, { row: 2, column: 0 }) // a6
		.makeMove({ row: 6, column: 4 }, { row: 5, column: 4 }) // e3
		.makeMove({ row: 2, column: 0 }, { row: 3, column: 0 }) // a5
		.makeMove({ row: 7, column: 5 }, { row: 6, column: 4 }) // Be2
		.makeMove({ row: 3, column: 0 }, { row: 4, column: 0 }) // a4
		.makeMove({ row: 7, column: 4 }, { row: 7, column: 6 }); // O-O
	compareHistories(gameFromString.history, gameB.history);
	expect(gameB.historyToString()).toEqual(historyString);
});
