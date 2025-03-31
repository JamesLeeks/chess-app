import { Square } from "./Square";
import { Board, PieceColour, Position } from "../../../common/src/models";

export type BoardComponentParams = {
	board: Board;
	handleClick: (
		row: number,
		column: number /* TODO: get row and column from square: Position */
	) => void;
	selectedSquare: Position | null;
	moveOptions: Position[];
	side: PieceColour;
};

export function BoardComponent({
	board,
	handleClick,
	selectedSquare,
	moveOptions,
	side,
}: BoardComponentParams) {
	const boardContent = [];
	// for each row:
	for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
		// for each column:
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
					key={`column-${columnIndex}-row-${rowIndex}`}
					// look up position from piecePosition
					chessPiece={board[rowIndex][columnIndex]}
					selected={isSelected}
					moveOption={isMoveOption}
					onSquareClick={() => handleClick(rowIndex, columnIndex)}
					position={{ column: columnIndex, row: rowIndex }}
					side={side}
				/>
			);
			// add square to boardContent
			boardContent.push(square);
		}
	}

	return (
		<>
			<div className="board">{boardContent}</div>
		</>
	);
}
