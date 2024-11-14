import { getStartingBoard } from "../src/board";
import { Game } from "../src/game";
import { getGame, compareHistories } from "./testHelpers";

test("castling", () => {
	const initialBoard = getStartingBoard();
	const gameA = getGame(initialBoard)
		.makeMoveFromNotation("Nf3")
		.makeMoveFromNotation("a6")
		.makeMoveFromNotation("e3")
		.makeMoveFromNotation("a5")
		.makeMoveFromNotation("Be2")
		.makeMoveFromNotation("a4")
		.makeMoveFromNotation("O-O");

	const gameB = Game.fromJson(gameA.toJsonString());
	compareHistories(gameA.history, gameB.history);
	expect(gameA.id).toEqual(gameB.id);
});
