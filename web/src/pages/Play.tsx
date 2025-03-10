import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Game, SerializedGame } from "../../../common/src/game";
import { GameComponent } from "../components/Game";
import { Position, PromotionType } from "../../../common/src/models";
import { getApiBase } from "../getApiBase";
import { io, Socket } from "socket.io-client";
import {
	getAuthorizationHeader,
	getMsalAccount,
} from "./getAuthorizationHeader";

// const socket = io(getApiBase(), {
// 	auth: {
// 		gameId: "wibble123",
// 	},
// });

let socket: Socket | null = null;

export function Play() {
	const { id } = useParams();
	const [game, setGame] = useState<Game | null>(null);
	// const [isConnected, setIsConnected] = useState(false);
	const [responseStatus, setResponseStatus] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const userId = getMsalAccount()?.localAccountId;

	useEffect(() => {
		async function doIt() {
			if (!socket) {
				const game = await getGame();

				const authHeader = await getAuthorizationHeader();
				if (!authHeader) {
					throw new Error("401");
				}
				socket = io(getApiBase(), {
					// transports: ["polling"],
					extraHeaders: { authorization: authHeader },
					auth: {
						gameId: id,
					},
				});
				console.log("socket setup", { game });
				if (
					game?.playerId &&
					userId !== game?.playerId &&
					userId !== game?.ownerId
				) {
					throw new Error("401");
				}
			}

			// function onConnect() {
			// 	setIsConnected(true);
			// }

			// function onDisconnect() {
			// 	setIsConnected(false);
			// }

			function onGameUpdateEvent(g: SerializedGame) {
				console.log("on game update", { g });
				setGame(Game.fromJsonObject(g));
			}

			// socket.on("connect", onConnect);
			// socket.on("disconnect", onDisconnect);
			socket.on("gameUpdate", onGameUpdateEvent);

			return () => {
				if (socket) {
					// socket.off("connect", onConnect);
					// socket.off("disconnect", onDisconnect);
					socket.off("gameUpdate", onGameUpdateEvent);
				}
			};
		}
		doIt();
	}, []);

	async function makeMove(
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) {
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}
		const response = await fetch(`${getApiBase()}/games/${id}/moves`, {
			method: "POST",
			body: JSON.stringify({ from, to, promotionType }),
			headers: {
				"content-type": "application/json",
				Authorization: authHeader,
			},
		});
		const responseBody = await response.json();
		const game = Game.fromJsonObject(responseBody);
		setGame(game);
	}

	async function getGame() {
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}
		const response = await fetch(`${getApiBase()}/games/${id}`, {
			headers: { Authorization: authHeader },
			method: "GET",
		});
		const responseBody = await response.json();
		setResponseStatus(response.status);
		if (!response.ok) {
			return;
		}
		const game = Game.fromJsonObject(responseBody);
		console.log("game loaded", {
			whiteTime: game.whiteTime,
			blackTime: game.blackTime,
		});
		setGame(game);
		return game;
	}

	const navigate = useNavigate();

	async function onclick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}

		const response = await fetch(
			`${getApiBase()}/games/${game?.id}/addPlayer`,
			{
				headers: {
					"content-type": "application/json",
					Authorization: authHeader,
				},
				method: "POST",
			}
		);
		const responseBody = await response.json();
		const id = responseBody.id;
		console.log({ id });

		navigate(`/play/${id}`);
		return;
	}

	if (responseStatus === 404) {
		return <>404 Game not found.</>;
	}
	if (responseStatus && responseStatus >= 300) {
		return <>Error code {responseStatus}</>;
	}
	if (!game) {
		return <>loading...</>;
	}

	if (userId === game.ownerId || userId === game.playerId) {
		return <GameComponent game={game} makeMove={makeMove} />;
	} else {
		return (
			<>
				<button onClick={onclick} disabled={isLoading}>
					TODO: on click make api call to add player to game
				</button>
			</>
		);
	}
}
