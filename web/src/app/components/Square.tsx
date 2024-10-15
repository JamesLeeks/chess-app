import { ChessPiece } from "../core/models";

interface SquareProps {
	chessPiece?: ChessPiece;
	selected?: boolean;
	moveOption?: boolean;
	onSquareClick: () => void;
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
		<div className={`piece ${pieceClass}`}></div>
	) : undefined;
	return (
		<div className={`square ${displayType}`} onClick={onSquareClick}>
			{squareContent}
		</div>
	);
}
