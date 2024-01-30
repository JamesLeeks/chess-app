export type SquareType = "dark" | "light";
export type PieceType = "rook" | "knight" | "bishop" | "king" | "queen" | "pawn";
export type PieceColour = "black" | "white";
export type BoardSquare = ChessPiece | undefined;

export interface Position {
	row: number;
	column: number;
}
export interface ChessPiece {
	colour: PieceColour;
	type: PieceType;
}
