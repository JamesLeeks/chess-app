import { useState } from "react";
import { BoardComponent } from "./Board";
import { Game } from "../core/game";
import { getStartingBoard } from "../core/board";
import { PieceColour, Position } from "../core/models";

export function GameComponent() {
	const [game, setGame] = useState<Game>(new Game(getStartingBoard()));
	const [currentTurn, setCurrentTurn] = useState<PieceColour>("white");
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);

	function makeMove(from: Position, to: Position) {
		setGame(game.makeMove(from, to));
	}

	function handleClick(row: number, column: number) {
		if (selectedSquare) {
			// there  a selected piece - move it
			if (game.board[row][column]?.colour === currentTurn) {
				// if it's their turn:
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare({ row: row, column: column });
				setMoveOptions(game.getMoveOptions(newSelectedSquare));
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
			if (
				game.board[row][column] &&
				currentTurn === game.board[row][column]?.colour
			) {
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare(newSelectedSquare);
				setMoveOptions(game.getMoveOptions(newSelectedSquare));
			} else {
				setSelectedSquare(null);
				setMoveOptions([]);
				return;
			}
		}
	}

	return (
		<>
			<BoardComponent
				board={game.board}
				handleClick={handleClick}
				moveOptions={moveOptions}
				selectedSquare={selectedSquare}
			/>
		</>
	);
}
