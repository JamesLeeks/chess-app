export type SquareType = "dark" | "light";

export type PieceColour = "black" | "white";

export type PieceType = "rook" | "knight" | "bishop" | "king" | "queen" | "pawn";
export type PromotionType = "rook" | "knight" | "bishop" | "queen";

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
}
