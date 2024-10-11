import { getStartingBoard } from "../board";
import { Game } from "../game";
import { getGame, compareHistories } from "./testHelpers";

test("castling", () => {
	const initialBoard = getStartingBoard();
	const gameA = getGame(initialBoard)
		.makeMove({ row: 7, column: 6 }, { row: 5, column: 5 }) // Nf3
		.makeMove({ row: 1, column: 0 }, { row: 2, column: 0 }) // a6
		.makeMove({ row: 6, column: 4 }, { row: 5, column: 4 }) // e3
		.makeMove({ row: 2, column: 0 }, { row: 3, column: 0 }) // a5
		.makeMove({ row: 7, column: 5 }, { row: 6, column: 4 }) // Be2
		.makeMove({ row: 3, column: 0 }, { row: 4, column: 0 }) // a4
		.makeMove({ row: 7, column: 4 }, { row: 7, column: 6 }); // O-O

	const gameB = Game.fromJson(gameA.toJson());
	compareHistories(gameA.history, gameB.history);
});
