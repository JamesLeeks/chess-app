export type SquareColour = "dark" | "light";

export type PieceColour = "black" | "white";

export type PieceType = "rook" | "knight" | "bishop" | "king" | "queen" | "pawn";
export type PromotionType = "rook" | "knight" | "bishop" | "queen";

export type GameResultFull = { reason: GameEndReason; result: GameEndType };

export type GameEndReason =
	| "whiteInCheckmate"
	| "whiteInStalemate"
	| "whiteTimeOut"
	| "blackInCheckmate"
	| "blackInStalemate"
	| "blackTimeOut"
	| "threeFoldRepetition"
	| undefined;

export type GameEndType = "whiteWins" | "blackWins" | "draw" | undefined;

export type Foo =
	| {
			result: "win";
			winningColour: PieceColour;
			reason: "checkmate" | "opponentResigned" | "opponentRanOutOfTime";
	  }
	| {
			result: "draw";
			reason: "stalemate" | "threefoldRepetition" | "fiftyMoveRule"; // add other reasons
	  };

export interface Position {
	row: number;
	column: number;
}

export interface ChessPiece {
	colour: PieceColour;
	type: PieceType;
}

export type BoardSquare = ChessPiece | undefined;

export type Board = BoardSquare[][];

export interface HistoryItem {
	boardAfterMove: Board;
	from: Position;
	to: Position;
	player: PieceColour;
	notation: string;
	boardString: string;
	timePlayed: number;
}
