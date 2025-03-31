import { ChessPiece, PieceColour, Position } from "../../../common/src/models";
import { toNotation } from "../../../common/src/position";

interface SquareProps {
	chessPiece?: ChessPiece;
	selected?: boolean;
	moveOption?: boolean;
	onSquareClick: () => void;
	position: Position;
	side: PieceColour;
}

export function Square(props: SquareProps) {
	// split props out like with an array
	const { chessPiece, selected, moveOption, onSquareClick } = props;
	// if chessPiece: build up the class name. else: just make it an empty string
	const pieceClass = chessPiece
		? `${chessPiece.colour}-${chessPiece.type}`
		: "";
	//build up the class name
	let displayType = "";
	if (selected) {
		displayType = "selected";
	} else if (moveOption) {
		displayType = "move-option";
	}

	const squareContent = chessPiece ? (
		<div
			className={`${
				props.side === props.chessPiece?.colour ? "pointer" : ""
			} piece ${pieceClass} ${toNotation(props.position)}`}
		></div>
	) : undefined;
	return (
		<div
			className={`square ${displayType} ${toNotation(props.position)}`}
			onClick={onSquareClick}
		>
			{squareContent}
		</div>
	);
}
