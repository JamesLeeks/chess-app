import { getBoardAfterMove } from "./board";
import { getBaseMoveOptions } from "./getMoveOptions";
import { isInCheck, isInCheckmate } from "./isInCheck";
import { Board, ChessPiece, HistoryItem, PieceColour, PieceType, Position, PromotionType } from "./models";
import { toNotation, toNotationSeperate } from "./position";

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

		const tempGame = new Game(
			boardAfterMove,
			[...this._history, { boardAfterMove, from, to, player: currentTurn, notation: "NOT A REAL VALUE" }],
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
		};
		newHistory.push(...this._history, newHistoryItem);

		// switch turn
		const newTurn: PieceColour = this.currentTurn === "white" ? "black" : "white";
		const newGame = new Game(newBoard, newHistory, newTurn);

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
