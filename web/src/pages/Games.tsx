import { useEffect, useState } from "react";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { ApiGame } from "../../../common/src/models";

export function Games() {
	const [games, setGames] = useState<ApiGame[] | null>(null);

	useEffect(() => {
		(async function getGames() {
			const authHeader = await getAuthorizationHeader();
			if (!authHeader) {
				return;
			}

			// GET games for user
			const response = await fetch(`${getApiBase()}/games`, {
				headers: { Authorization: authHeader },
				method: "GET",
			});

			if (response.status === 404) {
				throw new Error("404 not found");
			}
			if (!response.ok) {
				return;
			}

			const responseBody = await response.json();
			setGames(responseBody as ApiGame[]);
		})();
	}, []);

	return (
		<>
			<div className="games-container">
				{games === null ? (
					<>loading...</>
				) : (
					<>
						<div className="games-grid">
							{games.flatMap((game) => [
								<a
									href={`/play/${game.id}`}
									className="left"
									key={`${game.id}-ownerTime`}
								>
									{game.ownerSide === "white"
										? game.players.white.timeRemainingAtStartOfTurn
										: game.players.black.timeRemainingAtStartOfTurn}
								</a>,
								<a
									href={`/play/${game.id}`}
									key={`${game.id}-ownerName`}
								>
									{game.ownerName}
								</a>,
								<a href={`/play/${game.id}`}> - </a>,
								<a
									href={`/play/${game.id}`}
									className={game.playerName ? "" : "no-player"}
									key={`${game.id}-playerName`}
								>
									{game.playerName ?? "no player yet"}
								</a>,
								<a
									href={`/play/${game.id}`}
									className="right"
									key={`${game.id}-playerTime`}
								>
									{game.ownerSide === "black"
										? game.players.white.timeRemainingAtStartOfTurn
										: game.players.black.timeRemainingAtStartOfTurn}
								</a>,
							])}
						</div>
					</>
				)}
			</div>
		</>
	);
}

// <table className="games-list">
// 	<tr>
// 		<th>Owner Time</th>
// 		<th>Owner</th>
// 		<th>Player</th>
// 		<th>Player Time</th>
// 	</tr>

// 	{games.map((game) => (
// 		<tr>
// 			<td>
// 				{game.ownerSide === "white"
// 					? game.players.white.timeRemainingAtStartOfTurn
// 					: game.players.black.timeRemainingAtStartOfTurn}
// 			</td>
// 			<td>{game.ownerName}</td>
// 			{game.playerName ? (
// 				<td>{game.playerName}</td>
// 			) : (
// 				<td className="no-player">no player yet</td>
// 			)}
// 			<td>
// 				{game.ownerSide === "black"
// 					? game.players.white.timeRemainingAtStartOfTurn
// 					: game.players.black.timeRemainingAtStartOfTurn}
// 			</td>
// 		</tr>
// 	))}
// </table>

{
	/* <td>{game.playerName ?? "no player yet"}</td> */
}

// return (
// 	<>
// 		<div className="games-container">
// 			<table>
// 				<tr>
// 					<th>Owner Time</th>
// 					<th>Owner</th>
// 					<th>Player</th>
// 					<th>Player Time</th>
// 				</tr>
// 			</table>
// 		</div>
// 	</>
// );
