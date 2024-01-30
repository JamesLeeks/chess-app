import React, { useState } from "react";
import { Square } from "./Square";
import { getMoveOptions } from "../core/getMoveOptions";
import { BoardSquare, Position, PieceColour, SquareType } from "../core/models";
import { getStartingBoard } from "../core/getStartingBoard";

export function Board() {
	const [piecePositions, setPiecePositions] = useState<BoardSquare[][]>(
		getStartingBoard()
	);
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);
	const [currentTurn, setCurrentTurn] = useState<PieceColour>("white");

	function movePiece(from: Position, to: Position) {
		const newPiecePositions = piecePositions.slice();
		newPiecePositions[to.row][to.column] =
			piecePositions[from.row][from.column];
		newPiecePositions[from.row][from.column] = undefined;
		setPiecePositions(newPiecePositions);
	}

	function handleClick(row: number, column: number) {
		if (selectedSquare) {
			// there  a selected piece - move it
			if (piecePositions[row][column]?.colour === currentTurn) {
				// if it's their turn:
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare({ row: row, column: column });
				setMoveOptions(getMoveOptions(currentTurn, newSelectedSquare));
			} else {
				// note see foundMoveOptions
				const foundMoveOption = moveOptions.find(
					(pos) => pos.row === row && pos.column === column
				);
				if (foundMoveOption) {
					movePiece(selectedSquare, { row: row, column: column });
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
			if (
				piecePositions[row][column] &&
				currentTurn === piecePositions[row][column]?.colour
			) {
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare(newSelectedSquare);
				setMoveOptions(getMoveOptions(currentTurn, newSelectedSquare));
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
					chessPiece={piecePositions[rowIndex][columnIndex]}
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
