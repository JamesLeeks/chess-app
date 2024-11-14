import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../../../common/src/game";
import { GameComponent } from "../components/Game";
import { Position, PromotionType } from "../../../common/src/models";

export function Play() {
	const { id } = useParams();
	const [game, setGame] = useState<Game | null>(null);

	async function makeMove(
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) {
		const response = await fetch(`http://localhost:3000/games/${id}/moves`, {
			method: "POST",
			body: JSON.stringify({ from, to, promotionType }),
			headers: {
				"content-type": "application/json",
			},
		});
		const responseBody = await response.json();
		console.log(responseBody);
		const game = Game.fromJsonObject(responseBody);
		setGame(game);
	}

	async function getGame() {
		const response = await fetch(`http://localhost:3000/games/${id}`, {
			method: "GET",
		});
		const responseBody = await response.json();
		console.log(responseBody);
		const game = Game.fromJsonObject(responseBody);
		setGame(game);
	}
	useEffect(function () {
		getGame();
	}, []);

	if (!game) {
		return <>loading...</>;
	}
	return <GameComponent game={game} makeMove={makeMove} />;
}
