import React from "react";
import { SquareType, ChessPiece } from "../core/models";

interface SquareProps {
	squareType: SquareType;
	chessPiece?: ChessPiece;
	selected?: boolean;
	moveOption?: boolean;
	onSquareClick: () => void;
}

export function Square(props: SquareProps) {
	// split props out like with an array
	const { squareType, chessPiece, selected, moveOption, onSquareClick } =
		props;
	// if chessPiece: build up the class name. else: just make it an empty string
	const pieceClass = chessPiece
		? `${chessPiece.colour}-${chessPiece.type}`
		: "";
	//build up the class name
	let displayType = "";
	if (selected) {
		displayType = "-selected";
	} else if (moveOption) {
		displayType = "-move";
	}
	const squareClass = `${squareType}-square${displayType}`;

	return (
		<span
			className={`square ${squareClass} ${pieceClass}`}
			onClick={onSquareClick}
		></span>
	);
}
