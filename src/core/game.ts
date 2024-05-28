import { getBoardAfterMove } from "./board";
import { getBaseMoveOptions } from "./getMoveOptions";
import { isInCheck } from "./isInCheck";
import { Board, HistoryItem, PieceColour, Position } from "./models";

export class Game {
	private _board: Board;
	private _history: HistoryItem[];
	private _currentTurn: PieceColour;

	constructor(board: Board, history?: HistoryItem[], currentTurn?: PieceColour) {
		this._board = board;
		this._history = history ?? [];
		this._currentTurn = currentTurn ?? "white";
	}

	public get board(): Board {
		return this._board;
	}

	public get currentTurn(): PieceColour {
		return this._currentTurn;
	}

	public get history(): HistoryItem[] {
		return this._history;
	}

	getMoveOptions(selectedSquare: Position): Position[] {
		const selectedPiece = this._board[selectedSquare.row][selectedSquare.column];
		if (!selectedPiece) {
			throw new Error("should not get moves for undefined");
		}
		const ignoreKingMovesOnIsInCheck = selectedPiece.type !== "king";
		const currentTurn = selectedPiece.colour;

		const baseMoves = getBaseMoveOptions(selectedSquare, this._board, this._history);
		const filteredMoves: Position[] = [];

		// remove check moves
		for (let i = 0; i < baseMoves.length; i++) {
			const move = baseMoves[i];
			// if not in check after move:
			if (
				!isInCheck(getBoardAfterMove(this._board, selectedSquare, move), currentTurn, ignoreKingMovesOnIsInCheck)
			) {
				// push move
				filteredMoves.push(move);
			}
		}

		return filteredMoves;
	}

	makeMove(from: Position, to: Position): Game {
		// create a new game after move
		const newBoard = getBoardAfterMove(this._board, from, to);
		// create a blank history
		const newHistory = [];

		// create a history item and push it to the history
		const newHistoryItem: HistoryItem = { boardAfterMove: newBoard, from: from, to: to, player: this._currentTurn };
		newHistory.push(...this._history, newHistoryItem);

		// switch turn
		const newTurn: PieceColour = this.currentTurn === "white" ? "black" : "white";
		const newGame = new Game(newBoard, newHistory, newTurn);

		// return updated game
		return newGame;
	}
}
