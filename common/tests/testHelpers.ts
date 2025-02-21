import { Board, HistoryItem, PieceColour } from "../src/models";
import { Game, GameOptions } from "../src/game";

export function getGame(
	board: Board,
	whiteTime?: number,
	blackTime?: number,
	currentTurn?: PieceColour,
	ownerId?: string
) {
	const gameOptions: GameOptions = {
		board: board,
		whiteTime: whiteTime,
		blackTime: blackTime,
		currentTurn: currentTurn ?? "white",
		ownerId: ownerId,
		history: [],
	};
	return new Game(gameOptions);
	// return new Game(board, [], currentTurn ?? "white", whiteTime, blackTime, undefined, ownerId);
}

export function compareHistoryMoves(historyA: HistoryItem[], historyB: HistoryItem[]) {
	expect(historyA.length).toEqual(historyB.length);

	for (let index = 0; index < historyA.length; index++) {
		const historyItemA = historyA[index];
		const historyItemB = historyB[index];

		// expect(historyItemA).toEqual(historyItemB);

		// compare individual properties to avoid comparing time played
		expect(historyItemA.from).toEqual(historyItemB.from);
		expect(historyItemA.to).toEqual(historyItemB.to);
		expect(historyItemA.player).toEqual(historyItemB.player);
		expect(historyItemA.notation).toEqual(historyItemB.notation);
		expect(historyItemA.boardString).toEqual(historyItemB.boardString);
		expect(historyItemA.boardAfterMove).toEqual(historyItemB.boardAfterMove);
	}
}

// from https://stackoverflow.com/questions/37764665/how-to-implement-sleep-function-in-typescript
export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
