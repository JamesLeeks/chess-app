import { Square } from "./Square";
import { Board, Position } from "../../../common/src/models";

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
