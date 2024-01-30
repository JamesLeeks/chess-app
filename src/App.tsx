import React, { useState } from "react";
import "./App.css";

type SquareType = "dark" | "light";
type PieceType = "rook" | "knight" | "bishop" | "king" | "queen" | "pawn";
type PieceColour = "black" | "white";
type BoardSquare = ChessPiece | undefined;

interface Position {
	row: number;
	column: number;
}
interface ChessPiece {
	colour: PieceColour;
	type: PieceType;
}

interface SquareProps {
	squareType: SquareType;
	chessPiece?: ChessPiece;
	selected?: boolean;
	moveOption?: boolean;
	onSquareClick: () => void;
}

function Square(props: SquareProps) {
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
			className={`${squareClass} ${pieceClass}`}
			onClick={onSquareClick}
		></span>
	);
}

function getMoveOptions(
	currentTurn: PieceColour,
	selectedSquare: Position
): Position[] {
	if (currentTurn === "white") {
		return [
			{ row: selectedSquare.row - 1, column: selectedSquare.column },
			{ row: selectedSquare.row - 2, column: selectedSquare.column },
		];
	} else {
		return [
			{ row: selectedSquare.row + 1, column: selectedSquare.column },
			{ row: selectedSquare.row + 2, column: selectedSquare.column },
		];
	}
}

function Board() {
	const [piecePositions, setPiecePositions] = useState<BoardSquare[][]>([
		[
			{ colour: "black", type: "rook" },
			{ colour: "black", type: "knight" },
			{ colour: "black", type: "bishop" },
			{ colour: "black", type: "queen" },
			{ colour: "black", type: "king" },
			{ colour: "black", type: "bishop" },
			{ colour: "black", type: "knight" },
			{ colour: "black", type: "rook" },
		],
		Array(8).fill({ colour: "black", type: "pawn" }),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill({ colour: "white", type: "pawn" }),
		[
			{ colour: "white", type: "rook" },
			{ colour: "white", type: "knight" },
			{ colour: "white", type: "bishop" },
			{ colour: "white", type: "queen" },
			{ colour: "white", type: "king" },
			{ colour: "white", type: "bishop" },
			{ colour: "white", type: "knight" },
			{ colour: "white", type: "rook" },
		],
	]);
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
				// TODO: check that row and column is in the moveOptions
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

function App() {
	return <Board />;
}

export default App;
