import { getStartingBoard } from "../board";
import { Game } from "../game";
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

	const gameB = Game.fromJson(gameA.toJson());
	compareHistories(gameA.history, gameB.history);
	expect(gameA.id).toEqual(gameB.id);
});
