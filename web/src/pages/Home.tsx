import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";

export function Home() {
	const navigate = useNavigate();
	async function onClick() {
		const response = await fetch(`${getApiBase()}/games`, {
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
			<button onClick={onClick}>New Game</button>
		</>
	);
}
