import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { useState } from "react";

export function CreateGame() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	async function onClick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}
		const response = await fetch(`${getApiBase()}/games`, {
			headers: { Authorization: authHeader },
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
			<p>TODO - add game settings here</p>
			<div>{isLoading ? "Loading..." : ""}</div>
			<button onClick={onClick} disabled={isLoading}>
				New Game
			</button>
		</>
	);
}
