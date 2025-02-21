import { useState } from "react";
import { getStartingBoard } from "../../../common/src/board";
import { Game } from "../../../common/src/game";
import { Position, PromotionType } from "../../../common/src/models";
import { GameComponent } from "../components/Game";

export function LocalGame() {
	const [game, setGame] = useState<Game>(
		new Game({ board: getStartingBoard() })
	);

	function makeMove(
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) {
		setGame(game.makeMove(from, to, promotionType));
	}
	return (
		<>
			<GameComponent makeMove={makeMove} game={game} />
		</>
	);
}
