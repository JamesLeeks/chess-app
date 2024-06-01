import { useState } from "react";
import { BoardComponent } from "./Board";
import { Game } from "../core/game";
import { getStartingBoard } from "../core/board";
import { Position, PromotionType } from "../core/models";

export function GameComponent() {
	const [game, setGame] = useState<Game>(new Game(getStartingBoard()));
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);
	const [promotionSquare, setPromotionSquare] = useState<Position | null>(
		null
	);

	function makeMove(
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) {
		setGame(game.makeMove(from, to, promotionType));
	}

	function handleClick(row: number, column: number) {
		setPromotionSquare(null);
		if (selectedSquare) {
			// there's a selected piece - move it
			if (game.board[row][column]?.colour === game.currentTurn) {
				// if it's their turn:
				// update selected square and move options for new selected piece
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare({ row: row, column: column });
				setMoveOptions(game.getMoveOptions(newSelectedSquare));
			} else {
				// not their turn
				const foundMoveOption = moveOptions.find(
					(pos) => pos.row === row && pos.column === column
				);
				if (foundMoveOption) {
					// clicked on a move option for the selected piece => move it!
					const promotionRow = game.currentTurn === "black" ? 7 : 0;
					if (
						game.board[selectedSquare.row][selectedSquare.column]
							?.type === "pawn" &&
						row === promotionRow
					) {
						setPromotionSquare({ row: row, column: column });
						return;
					}
					makeMove(selectedSquare, { row: row, column: column });
				}
				setSelectedSquare(null);
				setMoveOptions([]);
			}
		} else {
			// picking a piece
			// if there is a piece on this square and it's their turn
			if (
				game.board[row][column] &&
				game.currentTurn === game.board[row][column]?.colour
			) {
				// set selected square and show move options
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare(newSelectedSquare);
				setMoveOptions(game.getMoveOptions(newSelectedSquare));
			} else {
				// clear selected piece and move options
				setSelectedSquare(null);
				setMoveOptions([]);
			}
		}
	}

	function promote(
		from: Position,
		to: Position,
		promotionType: PromotionType
	) {
		makeMove(from, to, promotionType);
		setSelectedSquare(null);
		setMoveOptions([]);
		setPromotionSquare(null);
	}

	return (
		<>
			<div>
				<BoardComponent
					board={game.board}
					handleClick={handleClick}
					moveOptions={moveOptions}
					selectedSquare={selectedSquare}
				/>
			</div>
			{selectedSquare && promotionSquare && (
				<div>
					<button
						onClick={() => {
							promote(selectedSquare, promotionSquare, "queen");
						}}
					>
						queen
					</button>

					<button
						onClick={() => {
							promote(selectedSquare, promotionSquare, "knight");
						}}
					>
						knight
					</button>

					<button
						onClick={() => {
							promote(selectedSquare, promotionSquare, "bishop");
						}}
					>
						bishop
					</button>

					<button
						onClick={() => {
							promote(selectedSquare, promotionSquare, "rook");
						}}
					>
						rook
					</button>
				</div>
			)}
		</>
	);
}
