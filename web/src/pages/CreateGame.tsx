import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { useState } from "react";
import { TimeInput } from "../components/TimeInput";

function pickRandomSide() {
	return Math.random() < 0.5 ? "black" : "white";
}

export function CreateGame() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [startingTime, setStartingTime] = useState<number>(600);
	const [ownerSide, setOwnerSide] = useState<string>("white");
	const [opponent, setOpponent] = useState<string | undefined>(undefined);
	const [allowSpectators, setAllowSpectators] = useState<string>("private");

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
				allowSpectators: allowSpectators,
				specifiedOpponent: opponent,
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
			<div className="profile-container">
				<div className="profile-content">
					{TimeInput()}

					{/* TIME */}
					<input
						className="profile-field"
						type="number"
						value={startingTime}
						onChange={(e) => setStartingTime(e.target.valueAsNumber)}
						disabled={isLoading}
					/>

					{/* OPPONENT */}
					<input
						className="profile-field"
						type="string"
						value={opponent}
						onChange={(e) => setOpponent(e.target.value)}
						disabled={isLoading}
					/>

					{/* SPECTATING */}
					<select
						className="profile-field"
						value={allowSpectators}
						onChange={(e) => setAllowSpectators(e.target.value)}
						disabled={isLoading}
					>
						<option value={"private"}>
							Don't allow public spectating
						</option>
						<option value={"public"}>Allow public spectating</option>
						<option value={"users"} disabled={true}>
							Allow specified users to spectate
						</option>
					</select>

					{/* OWNER SIDE */}
					<select
						className="profile-field"
						value={ownerSide}
						onChange={(e) => setOwnerSide(e.target.value)}
						disabled={isLoading}
					>
						<option value="black">OWNER SIDE: Black</option>
						<option value="white">OWNER SIDE: White</option>
						<option value="random">OWNER SIDE: Random</option>
					</select>

					<div>{isLoading ? "Loading..." : ""}</div>

					<button
						className="profile-button"
						onClick={onClick}
						disabled={isLoading}
					>
						New Game
					</button>
				</div>
			</div>
		</>
	);
}
