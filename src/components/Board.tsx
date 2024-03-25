import React, { useState } from "react";
import { Square } from "./Square";
import { getMoveOptions } from "../core/getMoveOptions";
import { Board, Position, PieceColour, SquareType } from "../core/models";

export type BoardComponentParams = {
	board: Board;
	makeMove: (from: Position, to: Position) => void;
};
export function BoardComponent({ board, makeMove }: BoardComponentParams) {
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);
	const [currentTurn, setCurrentTurn] = useState<PieceColour>("white");

	// TODO: move click handling up to the GameComponent
	function handleClick(row: number, column: number) {
		if (selectedSquare) {
			// there  a selected piece - move it
			if (board[row][column]?.colour === currentTurn) {
				// if it's their turn:
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare({ row: row, column: column });
				setMoveOptions(getMoveOptions(newSelectedSquare, board));
			} else {
				// note see foundMoveOptions
				const foundMoveOption = moveOptions.find(
					(pos) => pos.row === row && pos.column === column
				);
				if (foundMoveOption) {
					makeMove(selectedSquare, { row: row, column: column });
				} else {
					setSelectedSquare(null);
					setMoveOptions([]);
					return;
				}
				setSelectedSquare(null);
				setMoveOptions([]);
				// switch turn
				if (currentTurn === "white") {
					setCurrentTurn("black");
				} else {
					setCurrentTurn("white");
				}
			}
		} else {
			// picking a piece
			// if there is a piece on this square and it's their turn
			if (board[row][column] && currentTurn === board[row][column]?.colour) {
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare(newSelectedSquare);
				setMoveOptions(getMoveOptions(newSelectedSquare, board));
			} else {
				setSelectedSquare(null);
				setMoveOptions([]);
				return;
			}
		}
	}

	const boardContent = [];
	// for each row:
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// build up rows that are <div><Square... /><Square... /> .... </div>
		// rowSquares is what goes inside the <div></div>
		const rowSquares = [];
		// for each column:
		let squareType: SquareType = "light";
		if (rowIndex % 2 > 0) {
			squareType = "dark";
		}
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			const isSelected =
				selectedSquare?.row === rowIndex &&
				selectedSquare?.column === columnIndex;
			const foundMoveOption = moveOptions.find(
				(pos) => pos.row === rowIndex && pos.column === columnIndex
			);
			const isMoveOption = foundMoveOption !== undefined; // if we have foundMoveOption, we found a move option that matches the current row and column
			const square = (
				<Square
					key={`column-${columnIndex}}`}
					squareType={squareType}
					// look up position from piecePosition
					chessPiece={board[rowIndex][columnIndex]}
					selected={isSelected}
					moveOption={isMoveOption}
					onSquareClick={() => handleClick(rowIndex, columnIndex)}
				/>
			);
			// add square to rowSquares
			rowSquares.push(square);

			if (squareType === "light") {
				squareType = "dark";
			} else {
				squareType = "light";
			}
		}
		// wrap the Squares in a div
		const row = <div key={`row-${rowIndex}}`}>{rowSquares}</div>;
		// add row to the board
		boardContent.push(row);
	}

	return (
		<>
			<div className="board">{boardContent}</div>
		</>
	);
}
