import { Square } from "./Square";
import { Board, Position, SquareType } from "../core/models";

export type BoardComponentParams = {
	board: Board;
	// TODO: get row and column from square: Position
	handleClick: (row: number, column: number) => void;
	selectedSquare: Position | null;
	moveOptions: Position[];
};
export function BoardComponent({
	board,
	handleClick,
	selectedSquare,
	moveOptions,
}: BoardComponentParams) {
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
