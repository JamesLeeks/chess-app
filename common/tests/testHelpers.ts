import { Board, HistoryItem, PieceColour } from "../models";
import { Game } from "../src/game";

export function getGame(board: Board, whiteTime?: number, blackTime?: number, currentTurn?: PieceColour) {
	return new Game(board, [], currentTurn ?? "white", whiteTime, blackTime);
}

export function compareHistories(historyA: HistoryItem[], historyB: HistoryItem[]) {
	expect(historyA.length).toEqual(historyB.length);

	for (let index = 0; index < historyA.length; index++) {
		const historyItemA = historyA[index];
		const historyItemB = historyB[index];

		expect(historyItemA).toEqual(historyItemB);

		// expect(historyItemA.from).toEqual(historyItemB.from);
		// expect(historyItemA.to).toEqual(historyItemB.to);
		// expect(historyItemA.player).toEqual(historyItemB.player);
		// expect(historyItemA.notation).toEqual(historyItemB.notation);
		// expect(historyItemA.boardString).toEqual(historyItemB.boardString);
		// expect(historyItemA.boardAfterMove).toEqual(historyItemB.boardAfterMove);
	}
}
