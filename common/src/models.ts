export type SquareColour = "dark" | "light";

export type PieceColour = "black" | "white";

export type PieceType = "rook" | "knight" | "bishop" | "king" | "queen" | "pawn";
export type PromotionType = "rook" | "knight" | "bishop" | "queen";

export type GameResultFull = { reason: GameEndReason; result: GameEndType };

export type allowSpectators = "private" | "public" | "users";

export type GameEndReason =
	| "whiteInCheckmate"
	| "whiteInStalemate"
	| "whiteTimeOut"
	| "blackInCheckmate"
	| "blackInStalemate"
	| "blackTimeOut"
	| "threeFoldRepetition"
	| "insufficientMaterial"
	| undefined;

export type GameEndType = "whiteWins" | "blackWins" | "draw" | undefined;

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

export type Account = {
	username: string;
	email?: string; // optional because email wasn't enforced originally
};

export type AccountCreate = {
	username: string;
	email: string; // email forced when creating or updating account
};

export type UserEmailRequest = {
	id: string;
	username: string;
	email?: string;
	emailRequest?: {
		email?: string;
		token: string;
	};
	type: "user";
};

// export type UserEmailConfirmation = {
// 	id: string;
// 	username: string;
// 	email: string;
// 	emailRequest: undefined;
// 	type: "user";
// };

export type User = {
	id: string;
	username: string;
	email?: string;
	type: "user";
};
