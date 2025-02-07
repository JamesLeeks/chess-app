import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export function CreateGame() {
	const navigate = useNavigate();
	async function onClick() {
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
			<button onClick={onClick}>New Game</button>
		</>
	);
}
