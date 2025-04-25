import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { useState } from "react";

function pickRandomSide() {
	return Math.random() < 0.5 ? "black" : "white";
}

export function CreateGame() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [startingTime, setStartingTime] = useState<number>(600);
	const [ownerSide, setOwnerSide] = useState<string>("white");
	const [allowSpectators, setAllowSpectators] = useState<string>("private");

	const navigate = useNavigate();

	async function onClick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}

		// goes to GamesController.ts, line 21
		const response = await fetch(`${getApiBase()}/games`, {
			headers: {
				"content-type": "application/json",
				Authorization: authHeader,
			},
			body: JSON.stringify({
				startingTime: startingTime,
				ownerSide:
					ownerSide === "white" || ownerSide === "black"
						? ownerSide
						: pickRandomSide(),
				allowSpectators: allowSpectators,
			}),
			method: "POST",
		});
		const responseBody = await response.json();
		const id = responseBody.id;

		navigate(`/play/${id}`);
		return;
	}

	return (
		<>
			<div>TODO - add game settings here</div>
			<input
				type="number"
				value={startingTime}
				onChange={(e) => setStartingTime(e.target.valueAsNumber)}
				disabled={isLoading}
			/>
			<input type="string" value={"TODO: username"} disabled={true} />
			<select
				value={allowSpectators}
				onChange={(e) => setAllowSpectators(e.target.value)}
				disabled={isLoading}
			>
				<option value={"private"}>Don't allow public spectating</option>
				<option value={"public"}>Allow public spectating</option>
				<option value={"users"} disabled={true}>
					Allow specified users to spectate
				</option>
			</select>
			<select
				value={ownerSide} // ...force the select's value to match the state variable...
				onChange={(e) => setOwnerSide(e.target.value)}
				disabled={isLoading}
			>
				<option value="black">OWNER SIDE: Black</option>
				<option value="white">OWNER SIDE: White</option>
				<option value="random">OWNER SIDE: Random</option>
			</select>
			<div>{isLoading ? "Loading..." : ""}</div>
			<button onClick={onClick} disabled={isLoading}>
				New Game
			</button>
		</>
	);
}
