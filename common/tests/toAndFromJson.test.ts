import { getStartingBoard } from "../src/board";
import { Game } from "../src/game";
import { getGame, compareHistoryMoves } from "./testHelpers";

test("castling", () => {
	const initialBoard = getStartingBoard();
	const gameA = getGame(initialBoard, undefined, undefined, undefined, "FAKE_ID")
		.makeMoveFromNotation("Nf3")
		.makeMoveFromNotation("a6")
		.makeMoveFromNotation("e3")
		.makeMoveFromNotation("a5")
		.makeMoveFromNotation("Be2")
		.makeMoveFromNotation("a4")
		.makeMoveFromNotation("O-O");

	const gameB = Game.fromJson(gameA.toJsonString());
	compareHistoryMoves(gameA.history, gameB.history);
	expect(gameA.id).toEqual(gameB.id);
});
