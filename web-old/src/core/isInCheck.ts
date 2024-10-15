import { Board, PieceColour, Position } from "./models";
import { getBaseMoveOptions } from "./getMoveOptions";
import { Game } from "./game";

export function isInCheckmate(game: Game) {
	// returns true if the specified side cannot move and their king is in check
	if (!canSideMove(game, game.currentTurn) && isInCheck(game.board, game.currentTurn, { ignoreKing: true })) {
		return true;
	}
	return false;
}

export function isInStalemate(game: Game) {
	// returns true if the specified side cannot move and their king is NOT in check
	if (!canSideMove(game, game.currentTurn) && !isInCheck(game.board, game.currentTurn, { ignoreKing: true })) {
		return true;
	}
	return false;
}

function canSideMove(game: Game, currentTurn: PieceColour) {
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// for each row:
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			// for each column:
			const currentSquare = game.board[rowIndex][columnIndex];
			if (currentSquare) {
				// if there is a piece on the current square:
				if (currentSquare.colour === currentTurn) {
					// if the piece is of the same colour as the current turn:
					const moveOptions = game.getMoveOptions({ row: rowIndex, column: columnIndex });
					if (moveOptions.length > 0) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

export function isInCheck(
	board: Board,
	kingColour: PieceColour,
	options?: {
		ignoreKing?: boolean;
		ignoreCastling?: boolean;
	}
): boolean {
	// ignoreKing is used to prevent endless recursion (see comments in isThreatened)
	// ignoreKing can/should be used for existing valid board positions
	// ignoreKing should *not* be used to validate new board positions

	const opponentColour = kingColour === "white" ? "black" : "white";
	return isThreatened(board, opponentColour, findKing(board, kingColour), options);
}

function findKing(board: Board, kingColour: PieceColour): Position {
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			const currentSquare = board[rowIndex][columnIndex];
			if (currentSquare?.type === "king" && currentSquare.colour === kingColour) {
				return { row: rowIndex, column: columnIndex };
			}
		}
	}
	throw new Error(`Cannot find ${kingColour} king`);
}

export function isThreatened(
	board: Board,
	opponentColour: PieceColour,
	position: Position,
	options?: {
		ignoreKing?: boolean;
		ignoreCastling?: boolean;
	}
) {
	// for each row
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// for each column
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			// if the piece on this square is the opponent's colour
			if (board[rowIndex][columnIndex]?.colour === opponentColour) {
				// if ignore king is set to true and the square we're on has the value of king, skip to the next square
				// (this is for the isInCheck function because the king can never be in check from another king)
				// This was added to avoid endless recursion!
				if (options?.ignoreKing && board[rowIndex][columnIndex]?.type === "king") {
					continue;
				}
				const selectedSquare = { row: rowIndex, column: columnIndex };
				const currentSquare = board[rowIndex][columnIndex];
				if (currentSquare) {
					const enemyMoves = getBaseMoveOptions(selectedSquare, board, [], {
						ignoreCastling: options?.ignoreCastling,
					});
					// check if position is threatened
					// for every enemy move
					for (let i = 0; i < enemyMoves.length; i++) {
						const enemyMove = enemyMoves[i];
						// check if position is in the array of enemy moves
						if (enemyMove.row === position.row && enemyMove.column === position.column) {
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}
