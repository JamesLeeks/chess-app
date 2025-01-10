import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game, SerializedGame } from "../../../common/src/game";
import { GameComponent } from "../components/Game";
import { Position, PromotionType } from "../../../common/src/models";
import { getApiBase } from "../getApiBase";
import { io, Socket } from "socket.io-client";

// const socket = io(getApiBase(), {
// 	auth: {
// 		gameId: "wibble123",
// 	},
// });

let socket: Socket | null = null;

export function Play() {
	const { id } = useParams();
	const [game, setGame] = useState<Game | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [responseStatus, setResponseStatus] = useState<number | null>(null);

	console.log({ isConnected });

	if (!socket) {
		socket = io(getApiBase(), {
			auth: {
				gameId: id,
			},
		});
	}

	useEffect(() => {
		if (!socket) {
			throw new Error("Socket should not be null");
		}

		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onGameUpdateEvent(g: SerializedGame) {
			console.log({ g });
			setGame(Game.fromJsonObject(g));
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("gameUpdate", onGameUpdateEvent);

		return () => {
			if (socket) {
				socket.off("connect", onConnect);
				socket.off("disconnect", onDisconnect);
				socket.off("gameUpdate", onGameUpdateEvent);
			}
		};
	}, []);

	async function makeMove(
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) {
		const response = await fetch(`${getApiBase()}/games/${id}/moves`, {
			method: "POST",
			body: JSON.stringify({ from, to, promotionType }),
			headers: {
				"content-type": "application/json",
			},
		});
		const responseBody = await response.json();
		const game = Game.fromJsonObject(responseBody);
		setGame(game);
	}

	async function getGame() {
		const response = await fetch(`${getApiBase()}/games/${id}`, {
			method: "GET",
		});
		const responseBody = await response.json();
		setResponseStatus(response.status);
		if (!response.ok) {
			return;
		}
		const game = Game.fromJsonObject(responseBody);
		setGame(game);
	}

	useEffect(function () {
		getGame();
	}, []);

	if (responseStatus === 404) {
		return <>404 Game not found.</>;
	}
	if (responseStatus && responseStatus >= 300) {
		return <>Error code {responseStatus}</>;
	}
	if (!game) {
		return <>loading...</>;
	}
	return <GameComponent game={game} makeMove={makeMove} />;
}
