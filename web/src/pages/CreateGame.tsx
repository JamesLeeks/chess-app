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
	const [timeType, setTimeType] = useState<"increment" | "normal" | "endless">(
		"normal",
	);
	const [startingTime, setStartingTime] = useState<number>(600);
	const [ownerSide, setOwnerSide] = useState<string>("white");
	const [opponent, setOpponent] = useState<string | undefined>(undefined);
	const [publicGame, setPublicGame] = useState<boolean>(false);
	const [allowSpectators, setAllowSpectators] = useState<string>("private");
	const [isTimeValid, setIsTimeValid] = useState<boolean>(true);

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
					<div className="header">Time</div>
					<div className="slider-container">
						<button
							className={`slider slider-start ${timeType === "normal" ? "slider-selected" : ""}`}
							onClick={() => setTimeType("normal")}
							disabled={isLoading}
						>
							Normal
						</button>
						<button
							className={`slider ${timeType === "increment" ? "slider-selected" : ""}`}
							onClick={() => setTimeType("increment")}
							disabled={true}
						>
							Increment
						</button>
						<button
							className={`slider slider-end ${timeType === "endless" ? "slider-selected" : ""}`}
							onClick={() => setTimeType("endless")}
							disabled={true}
						>
							Endless
						</button>
					</div>
					<TimeInput
						value={startingTime}
						onIsValidChange={setIsTimeValid}
						onChange={setStartingTime}
						disabled={isLoading}
					/>
					<div className="header">Spectating</div>
					<div className="slider-container">
						<button
							className={`slider slider-start ${allowSpectators === "private" ? "slider-selected" : ""}`}
							onClick={() => setAllowSpectators("private")}
							disabled={isLoading}
						>
							Private
						</button>
						<button
							className={`slider ${allowSpectators === "public" ? "slider-selected" : ""}`}
							onClick={() => setAllowSpectators("public")}
							disabled={isLoading}
						>
							Public
						</button>
						<button
							className={`slider slider-end ${allowSpectators === "users" ? "slider-selected" : ""}`}
							onClick={() => setAllowSpectators("users")}
							disabled={true}
						>
							Custom
						</button>
					</div>
					{/* old spectating input */}
					{/* <select
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
					</select> */}
					{/*  */}
					<div className="header">Opponent</div>
					<div className="slider-container">
						<button
							className={`slider slider-start ${publicGame === false ? "slider-selected" : ""}`}
							onClick={() => {
								setPublicGame(false);
								setOpponent(undefined);
							}}
						>
							Specified
						</button>
						<button
							onClick={() => setPublicGame(true)}
							className={`slider slider-end ${publicGame === true ? "slider-selected" : ""}`}
						>
							Open Game
						</button>
					</div>
					{!publicGame ? "username" : ""}
					<input
						className="profile-field"
						type="string"
						value={opponent}
						onChange={(e) => setOpponent(e.target.value)}
						disabled={isLoading}
						hidden={publicGame}
					/>

					<div className="header">Your Side</div>
					<div className="slider-container">
						<button
							className={`slider slider-start ${ownerSide === "white" ? "slider-selected" : ""}`}
							onClick={() => setOwnerSide("white")}
							disabled={isLoading}
						>
							White
						</button>
						<button
							className={`slider ${ownerSide === "black" ? "slider-selected" : ""}`}
							onClick={() => setOwnerSide("black")}
							disabled={isLoading}
						>
							Black
						</button>
						<button
							className={`slider slider-end ${ownerSide === "random" ? "slider-selected" : ""}`}
							onClick={() => setOwnerSide("random")}
							disabled={isLoading}
						>
							Random
						</button>
					</div>

					{/* <select
						className="profile-field"
						value={ownerSide}
						onChange={(e) => setOwnerSide(e.target.value)}
						disabled={isLoading}
					>
						<option value="black">OWNER SIDE: Black</option>
						<option value="white">OWNER SIDE: White</option>
						<option value="random">OWNER SIDE: Random</option>
					</select> */}

					<div>{isLoading ? "Loading..." : ""}</div>
					<button
						className="profile-button"
						onClick={onClick}
						disabled={isLoading || !isTimeValid}
					>
						New Game
					</button>
				</div>
			</div>
		</>
	);
}
