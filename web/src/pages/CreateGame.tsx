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

	const navigate = useNavigate();

	async function onClick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}
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
