import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { useState } from "react";

export function CreateGame() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [startingTime, setStartingTime] = useState<number>(600);
	// const [side, setSide] = useState<string>("black");

	// console.log(side);

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
			body: JSON.stringify({ startingTime: startingTime }),
			method: "POST",
		});
		const responseBody = await response.json();
		const id = responseBody.id;
		console.log({ id });

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
			/>
			{/* <input type="string" value={"TODO: username"} disabled={true} /> */}
			{/* <select>
				<option value="black" onChange={() => setSide("black")}>
					Black
				</option>
				<option value="white" onChange={() => setSide("white")}>
					White
				</option>
				{/* <option value="random">Random</option> */}
			{/*</></select> */}
			<div>{isLoading ? "Loading..." : ""}</div>
			<button onClick={onClick} disabled={isLoading}>
				New Game
			</button>
		</>
	);
}
