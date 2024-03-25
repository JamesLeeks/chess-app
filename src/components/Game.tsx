import { useState } from "react";
import { BoardComponent } from "./Board";
import { Game } from "../core/game";
import { getStartingBoard } from "../core/board";
import { Position } from "../core/models";

export function GameComponent() {
	const [game, setGame] = useState<Game>(new Game(getStartingBoard()));

	function makeMove(from: Position, to: Position) {
		setGame(game.makeMove(from, to));
	}
	return (
		<>
			<BoardComponent board={game.board} makeMove={makeMove} />
		</>
	);
}
