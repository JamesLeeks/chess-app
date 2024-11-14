import { useNavigate } from "react-router-dom";

export function Home() {
	const navigate = useNavigate();
	async function onClick() {
		//TODO: don't hardcode the url
		const response = await fetch("http://localhost:3000/games", {
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
