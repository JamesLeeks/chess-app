import { useState } from "react";
import { BoardComponent } from "./Board";
import { Game } from "../core/game";
import { getStartingBoard } from "../core/board";
import { Position } from "../core/models";

export function GameComponent() {
	const [game, setGame] = useState<Game>(new Game(getStartingBoard()));
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);

	function makeMove(from: Position, to: Position) {
		setGame(game.makeMove(from, to));
	}

	function handleClick(row: number, column: number) {
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
					makeMove(selectedSquare, { row: row, column: column });
					// const promotionRow = game.currentTurn === "black" ? 7 : 0;
					// if (
					// 	game.board[selectedSquare.row][selectedSquare.column]
					// 		?.type === "pawn" &&
					// 	row === promotionRow
					// ) {
					// 	console.log("Bring up the promotion menu!");
					// }
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
			<div>hello!</div>
		</>
	);
}
