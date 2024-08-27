import { boardToString, getBoardAfterMove } from "./board";
import { getBaseMoveOptions } from "./getMoveOptions";
import { isInCheck, isInCheckmate, isInStalemate } from "./isInCheck";
import {
	Board,
	ChessPiece,
	GameResultFull,
	HistoryItem,
	PieceColour,
	PieceType,
	Position,
	PromotionType,
	SquareColour,
} from "./models";
import { toNotation, toNotationSeperate } from "./position";

export class Game {
	private _board: Board;
	private _history: HistoryItem[];
	private _currentTurn: PieceColour;
	private _whiteTimeRemainingAtStartOfTurn: number;
	private _blackTimeRemainingAtStartOfTurn: number;
	private _turnStartTime: Date;
	private _gameResult: GameResultFull | undefined;

	constructor(
		board: Board,
		history?: HistoryItem[],
		currentTurn?: PieceColour,
		whiteTime?: number,
		blackTime?: number
	) {
		this._board = board;
		this._history = history ?? [];
		this._currentTurn = currentTurn ?? "white";
		this._whiteTimeRemainingAtStartOfTurn = whiteTime ?? 600;
		this._blackTimeRemainingAtStartOfTurn = blackTime ?? 600;
		this._turnStartTime = new Date();
		this._gameResult = this.getGameResult();
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

	public get whiteTime(): number {
		if (this.currentTurn === "white" && this._history.length > 1 && !this._gameResult) {
			const currentTime = new Date();
			const timeSinceTurnStart = (currentTime.valueOf() - this._turnStartTime.valueOf()) / 1000;
			const timeRemaining = this._whiteTimeRemainingAtStartOfTurn - timeSinceTurnStart;
			return Math.max(timeRemaining, 0);
		}
		return this._whiteTimeRemainingAtStartOfTurn;
	}

	public get blackTime(): number {
		if (this.currentTurn === "black" && this._history.length > 1 && !this._gameResult) {
			const currentTime = new Date();
			const timeSinceTurnStart = (currentTime.valueOf() - this._turnStartTime.valueOf()) / 1000;
			const timeRemaining = this._blackTimeRemainingAtStartOfTurn - timeSinceTurnStart;
			return Math.max(timeRemaining, 0);
		}
		return this._blackTimeRemainingAtStartOfTurn;
	}

	private isThreeFoldRepetition(): boolean {
		let count = 0;
		for (let index = 0; index < this.history.length; index++) {
			if (
				this.history[index].boardString === this.history[this.history.length - 1].boardString &&
				this.history[index].player === this.history[this.history.length - 1].player
			) {
				count++;
			}
		}
		if (count >= 3) {
			return true;
		} else {
			return false;
		}
	}

	public getGameResult(): GameResultFull | undefined {
		if (isInCheckmate(this)) {
			return {
				reason: this.currentTurn === "white" ? "whiteInCheckmate" : "blackInCheckmate",
				result: this.currentTurn === "white" ? "blackWins" : "whiteWins",
			};
		}
		if (isInStalemate(this)) {
			return { reason: this.currentTurn === "white" ? "whiteInStalemate" : "blackInStalemate", result: "draw" };
		}
		if (this.whiteTime <= 0) {
			return this.sideCanCheckMate("black")
				? { reason: "whiteTimeOut", result: "blackWins" }
				: { reason: "whiteTimeOut", result: "draw" };
		}
		if (this.blackTime <= 0) {
			return this.sideCanCheckMate("white")
				? { reason: "blackTimeOut", result: "whiteWins" }
				: { reason: "blackTimeOut", result: "draw" };
		}
		if (this.isThreeFoldRepetition()) {
			return { reason: "threeFoldRepetition", result: "draw" };
		}
		return undefined;
	}

	public sideCanCheckMate(sideColour: PieceColour) {
		// return true if the side has pawns
		if (this.sideHasPawns(sideColour)) {
			return true;
		}

		if (this.sideOnlyHasBishops(sideColour) && this.allBishopsAreSameColour(sideColour)) {
			return false;
		}

		if (this.calculateMaterial(sideColour) >= 5) {
			// return true if the player has least five points of material and does not have to bishops of the same colour
			return true;
		}
	}

	public sideOnlyHasBishops(sideColour: PieceColour) {
		for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				const currentSquare = this.board[rowIndex][columnIndex];
				if (currentSquare?.colour === sideColour) {
					if (currentSquare.type === "knight" || currentSquare.type === "queen" || currentSquare.type === "rook") {
						return false;
					}
				}
			}
		}
		return true;
	}

	private getSquareColour(row: number, column: number): SquareColour {
		if (row % 2 === 0) {
			return column % 2 === 0 ? "light" : "dark";
		} else {
			return column % 2 === 0 ? "dark" : "light";
		}
	}

	private allBishopsAreSameColour(sideColour: PieceColour): boolean {
		let bishopColourSoFar: SquareColour | null = null;
		for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				const currentSquare = this.board[rowIndex][columnIndex];
				if (currentSquare?.colour === sideColour && currentSquare.type === "bishop") {
					const squareColor = this.getSquareColour(rowIndex, columnIndex);
					if (bishopColourSoFar) {
						if (squareColor !== bishopColourSoFar) {
							return false;
						}
					} else {
						bishopColourSoFar = squareColor;
					}
				}
			}
		}
		return bishopColourSoFar ? true : false;
	}

	public calculateMaterial(sideColour: PieceColour) {
		let material = 0;
		// loop over the board
		for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				const currentSquare = this.board[rowIndex][columnIndex];
				if (currentSquare?.colour === sideColour) {
					// add on points for peices of the specified colour
					if (currentSquare.type === "bishop") {
						material += 3;
					} else if (currentSquare.type === "knight") {
						material += 3;
					} else if (currentSquare.type === "pawn") {
						material += 1;
					} else if (currentSquare.type === "queen") {
						material += 9;
					} else if (currentSquare.type === "rook") {
						material += 5;
					}
				}
			}
		}
		return material;
	}

	public sideHasPawns(sideColour: PieceColour) {
		for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				const currentSquare = this.board[rowIndex][columnIndex];
				if (currentSquare?.type === "pawn" && currentSquare.colour === sideColour) {
					return true;
				}
			}
		}
		return false;
	}

	public isActive(): boolean {
		if (this.getGameResult()) {
			return false;
		}
		return true;
	}
	private noMovesLeft() {
		return isInCheckmate(this) || isInStalemate(this);
	}

	private getPieceLetter(piece: PieceType) {
		switch (piece) {
			case "rook":
				return "R";

			case "knight":
				return "N";

			case "bishop":
				return "B";

			case "king":
				return "K";

			case "queen":
				return "Q";

			case "pawn":
				return "";

			default:
				throw new Error("piece should have a type");
		}
	}

	private getMoveNotation(to: Position, from: Position, boardAfterMove: Board, boardBeforeMove: Board): string {
		const toSquare = boardAfterMove[to.row][to.column];
		if (!toSquare) {
			throw new Error("Move should have destination");
		}

		const fromSquare = boardBeforeMove[from.row][from.column];
		if (!fromSquare) {
			throw new Error("Move should have source");
		}

		if (toSquare.type === "king") {
			// if it was a king that moved:
			if (from.column < to.column) {
				// if it moved to the right:
				if (to.column - from.column === 2) {
					// if it was castling (right):
					return "O-O";
				}
			} else {
				// if it didn't move to the right:
				if (from.column - to.column === 2) {
					// if it was castling (left):
					return "O-O-O";
				}
			}
		}

		// get the square that has been moved to and convert it to the notation form
		const toAsString = toNotation(to);

		// get the piece that has been moved and check that it exists
		if (!toSquare) {
			throw new Error("Move should have piece");
		}
		// get piece type
		const pieceType = fromSquare.type;

		// DISAMBIGUATION
		const pieceArray = this.findPiecesThatCanMoveToSquare(boardBeforeMove, to, toSquare, from);

		let useFile = false;
		let useRank = false;

		for (let index = 0; index < pieceArray.length; index++) {
			const currentPiece = pieceArray[index];
			if (currentPiece.column === from.column) {
				// use rank to disambiguate
				useRank = true;
			} else {
				// use file to disambiguate
				if (currentPiece !== from) {
					useFile = true;
				}
			}
		}

		const rankAndFile = toNotationSeperate(from);
		const fileString = useFile ? rankAndFile.file : "";
		const rankString = useRank ? rankAndFile.rank : "";
		const disambiguation = fileString + rankString;

		// check if the move was a capture
		let captures = "";
		if (boardBeforeMove[to.row][to.column]) {
			captures = "x";
		}
		if (boardBeforeMove[to.row][to.column] && pieceType === "pawn") {
			captures = rankAndFile.file + "x";
		}

		const currentTurn = boardAfterMove[to.row][to.column]?.colour;
		if (!currentTurn) {
			throw new Error("Piece should have colour");
		}
		let opponentColour: PieceColour = "black";
		if (currentTurn === "black") {
			opponentColour = "white";
		}

		let check = "";
		if (isInCheck(boardAfterMove, opponentColour, { ignoreKing: true })) {
			check = "+";
		}

		const boardString = boardToString(boardAfterMove);
		const tempGame = new Game(
			boardAfterMove,
			[
				...this._history,
				{ boardAfterMove, from, to, player: currentTurn, notation: "NOT A REAL VALUE", boardString },
			],
			opponentColour
		);
		if (isInCheckmate(tempGame)) {
			check = "#";
		}

		// PROMOTION
		let promotion = "";
		if (boardBeforeMove[from.row][from.column]?.type === "pawn") {
			if (boardAfterMove[to.row][to.column]?.type !== "pawn") {
				const destination = boardAfterMove[to.row][to.column]?.type;
				if (!destination) {
					throw new Error("Move destination should have value");
				}
				promotion = "=" + this.getPieceLetter(destination);
			}
		}

		// Ba1xb2#
		return this.getPieceLetter(pieceType) + disambiguation + captures + toAsString + promotion + check;
	}

	public historyToString(): string {
		if (this.history.length === 0) {
			return "";
		}
		let historyString = this.history[0].notation;
		for (let index = 1; index < this.history.length; index++) {
			historyString = historyString + " " + this.history[index].notation;
		}
		return historyString;
	}

	private getHistoryItemFromString(
		moveString: string,
		player: PieceColour,
		boardBeforeMove: Board
	) /*: HistoryItem */ {
		let pieceType = "pawn";
		for (let index = 0; index < moveString.length; index++) {
			const character = moveString[index];

			switch (character) {
				case "K":
					pieceType = "king";
					break;

				case "Q":
					pieceType = "queen";
					break;

				case "R":
					pieceType = "rook";
					break;

				case "B":
					pieceType = "bishop";
					break;

				case "N":
					pieceType = "knight";
					break;

				default:
					break;
			}
		}
		// try to find a caps K or Q or R or B or N
		// if there isn't one, then it's a pawn move
	}

	public historyFromString(): HistoryItem[] {
		return [];
	}

	getMoveOptions(selectedSquare: Position): Position[] {
		const selectedPiece = this._board[selectedSquare.row][selectedSquare.column];
		if (!selectedPiece) {
			throw new Error("should not get moves for undefined");
		}

		// Get all possible piece moves
		const baseMoves = getBaseMoveOptions(selectedSquare, this._board, this._history);
		const filteredMoves: Position[] = [];

		// remove illegal moves
		const ignoreKingMovesOnIsInCheck = selectedPiece.type !== "king";
		const currentTurn = selectedPiece.colour;
		for (let i = 0; i < baseMoves.length; i++) {
			const move = baseMoves[i];
			// if not in check after move:
			if (
				!isInCheck(getBoardAfterMove(this._board, selectedSquare, move, { skipPromotion: true }), currentTurn, {
					ignoreKing: ignoreKingMovesOnIsInCheck,
				})
			) {
				// push move
				filteredMoves.push(move);
			}
		}

		return filteredMoves;
	}

	makeMove(from: Position, to: Position, promotionType?: PromotionType): Game {
		// create a new game after move
		const newBoard = getBoardAfterMove(this._board, from, to, { promotionType });
		// create a blank history
		const newHistory = [];

		// create a history item and push it to the history
		const newHistoryItem: HistoryItem = {
			boardAfterMove: newBoard,
			from: from,
			to: to,
			player: this._currentTurn,
			notation: this.getMoveNotation(to, from, newBoard, this._board),
			boardString: boardToString(newBoard),
		};
		newHistory.push(...this._history, newHistoryItem);

		// switch turn
		const newTurn: PieceColour = this.currentTurn === "white" ? "black" : "white";
		const newGame = new Game(newBoard, newHistory, newTurn, this.whiteTime, this.blackTime);

		// return updated game
		return newGame;
	}

	//
	// Find pieces of a specific type (and colour)
	// that can move to a specified square
	// Also allow ignoring a square
	//
	private findPiecesThatCanMoveToSquare(board: Board, square: Position, piece: ChessPiece, ignoreSquare: Position) {
		const pieces = [];
		// for each row
		for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
			// for each column
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				// if the piece on this square is the correct colour and type
				if (
					board[rowIndex][columnIndex]?.colour === piece.colour &&
					board[rowIndex][columnIndex]?.type === piece.type
				) {
					const currentSquare = board[rowIndex][columnIndex];
					const selectedSquare = { row: rowIndex, column: columnIndex };
					if (currentSquare) {
						const moves = getBaseMoveOptions(selectedSquare, board, []);
						// check if position is threatened
						// for every move
						for (let i = 0; i < moves.length; i++) {
							const move = moves[i];
							// check if position is in the array of moves
							if (move.row === square.row && move.column === square.column) {
								if (selectedSquare.row !== ignoreSquare.row || selectedSquare.column !== ignoreSquare.column) {
									pieces.push(selectedSquare);
								}
							}
						}
					}
				}
			}
		}
		return pieces;
	}
}
