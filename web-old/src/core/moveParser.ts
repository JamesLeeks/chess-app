import { PieceType, PromotionType } from "./models";

export type Check = "check" | "checkmate";
export type Castle = "kingSide" | "queenSide";

export interface ParsedMove {
	pieceType: PieceType | undefined;
	fromColumn: number | undefined;
	fromRow: number | undefined;
	capture: boolean;
	toColumn: number | undefined;
	toRow: number | undefined;
	promotionType: PromotionType | undefined;
	check: Check | undefined;
	castle: Castle | undefined;
}

export class MoveParser {
	private position: number = 0;
	private constructor(private moveString: string) {}

	public static parse(moveString: string): ParsedMove {
		const parser = new MoveParser(moveString);
		return parser.parseString();
	}
	private parseString(): ParsedMove {
		const castle = this.getCastle();
		if (castle) {
			return {
				pieceType: undefined,
				fromColumn: undefined,
				fromRow: undefined,
				capture: false,
				toColumn: undefined,
				toRow: undefined,
				promotionType: undefined,
				check: undefined,
				castle: castle,
			};
		}

		const piece = this.getPiece();
		const column1 = this.getFile();
		const row1 = this.getRank();
		const capture = this.getCapture();
		const column2 = this.getFile();
		const row2 = this.getRank();
		const promotionType = this.getPromotionType();
		const check = this.getCheck();

		if (column2 !== undefined) {
			return {
				pieceType: piece,
				fromColumn: column1,
				fromRow: row1,
				capture,
				toColumn: column2,
				toRow: row2,
				promotionType,
				check,
				castle: undefined,
			};
		} else {
			return {
				pieceType: piece,
				fromColumn: undefined,
				fromRow: undefined,
				capture,
				toColumn: column1,
				toRow: row1,
				promotionType,
				check,
				castle: undefined,
			};
		}
	}

	private getCastle(): Castle | undefined {
		if (this.moveString === "O-O") {
			return "kingSide";
		}
		if (this.moveString === "O-O-O") {
			return "queenSide";
		}
		return undefined;
	}

	private getPiece(): PieceType | undefined {
		switch (this.moveString[this.position]) {
			case "K":
				this.position++;
				return "king";

			case "Q":
				this.position++;
				return "queen";

			case "R":
				this.position++;
				return "rook";

			case "B":
				this.position++;
				return "bishop";

			case "N":
				this.position++;
				return "knight";

			default:
				return undefined;
		}
	}

	private getFile(): number | undefined {
		const column = "abcdefgh".indexOf(this.moveString[this.position]);

		if (column < 0) {
			return undefined;
		}
		this.position++;
		return column;
	}

	private getRank(): number | undefined {
		const row = "87654321".indexOf(this.moveString[this.position]);
		if (row < 0) {
			return undefined;
		}
		this.position++;
		return row;
	}

	private getCapture(): boolean {
		if (this.moveString[this.position] === "x") {
			this.position++;
			return true;
		}
		return false;
	}

	private getPromotionType(): PromotionType | undefined {
		if (this.moveString[this.position] === "=") {
			this.position++;
			const pieceType = this.getPiece();
			if (pieceType === undefined) {
				throw new Error(`Move should have promotionType. Move: ${this.moveString}`);
			}
			switch (pieceType) {
				case "king":
				case "pawn":
					throw new Error(`Invalid piece type for promotion. Piece type: ${pieceType}`);
			}
			return pieceType;
		}
		return undefined;
	}

	private getCheck(): Check | undefined {
		switch (this.moveString[this.position]) {
			case "+":
				return "check";

			case "#":
				return "checkmate";

			default:
				return undefined;
		}
	}
}
