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
						<input
							type="radio"
							id="time-normal"
							onClick={() => setTimeType("normal")}
							disabled={isLoading}
							hidden={true}
						/>
						<label
							htmlFor="time-normal"
							className={`slider slider-start ${timeType === "normal" ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Normal
						</label>

						<input
							type="radio"
							id="time-increment"
							onClick={() => setTimeType("increment")}
							disabled={true}
							hidden={true}
						/>
						<label
							htmlFor="time-increment"
							className={`slider ${timeType === "increment" ? "slider-selected" : ""} ${/* isLoading ? "disabled" : "" */ "disabled"}`}
						>
							Increment
						</label>

						<input
							type="radio"
							id="time-endless"
							onClick={() => setTimeType("endless")}
							disabled={true}
							hidden={true}
						/>
						<label
							htmlFor="time-endless"
							className={`slider slider-end ${timeType === "endless" ? "slider-selected" : ""} ${/* isLoading ? "disabled" : "" */ "disabled"}`}
						>
							Endless
						</label>
					</div>
					<TimeInput
						value={startingTime}
						onIsValidChange={setIsTimeValid}
						onChange={setStartingTime}
						disabled={isLoading}
					/>

					<div className="header">Spectating</div>
					<div className="slider-container">
						<input
							type="radio"
							id="spectating-private"
							onClick={() => setAllowSpectators("private")}
							disabled={isLoading}
							hidden={true}
						/>
						<label
							htmlFor="spectating-private"
							className={`slider slider-start ${allowSpectators === "private" ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Private
						</label>
						<input
							type="radio"
							id="spectating-public"
							onClick={() => setAllowSpectators("public")}
							disabled={isLoading}
							hidden={true}
						/>
						<label
							htmlFor="spectating-public"
							className={`slider ${allowSpectators === "public" ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Public
						</label>
						<input
							type="radio"
							id="spectating-custom"
							onClick={() => setAllowSpectators("users")}
							disabled={true}
							hidden={true}
						/>

						<label
							htmlFor="spectating-custom"
							className={`slider slider-end ${allowSpectators === "users" ? "slider-selected" : ""} ${/* isLoading ? "disabled" : "" */ "disabled"}`}
						>
							Custom
						</label>
					</div>

					<div className="header">Opponent</div>
					<div className="slider-container">
						<input
							type="radio"
							id={"opponent-specified"}
							onClick={() => {
								setPublicGame(false);
								setOpponent(undefined);
							}}
							hidden={true}
						/>
						<label
							htmlFor="opponent-specified"
							className={`slider slider-start ${publicGame === false ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Specified
						</label>
						<input
							type="radio"
							id="opponent-open"
							onClick={() => setPublicGame(true)}
							hidden={true}
						/>
						<label
							htmlFor="opponent-open"
							className={`slider slider-end ${publicGame === true ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Open Game
						</label>
					</div>

					<label htmlFor="opponent" hidden={publicGame}>
						username
					</label>
					<input
						id="opponent"
						className="profile-field"
						type="string"
						value={opponent}
						onChange={(e) => setOpponent(e.target.value)}
						disabled={isLoading}
						hidden={publicGame}
					/>

					<div className="header">Your Side</div>
					<div className="slider-container">
						<input
							type="radio"
							id="side-white"
							className={`slider slider-start ${ownerSide === "white" ? "slider-selected" : ""}`}
							onClick={() => setOwnerSide("white")}
							disabled={isLoading}
							hidden={true}
						/>
						<label
							htmlFor="side-white"
							className={`slider slider-start ${ownerSide === "white" ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							White
						</label>
						<input
							type="radio"
							id={"side-black"}
							className={`slider ${ownerSide === "black" ? "slider-selected" : ""}`}
							onClick={() => setOwnerSide("black")}
							disabled={isLoading}
							hidden={true}
						/>
						<label
							htmlFor="side-black"
							className={`slider ${ownerSide === "black" ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Black
						</label>
						<input
							type="radio"
							id="side-random"
							className={`slider slider-end ${ownerSide === "random" ? "slider-selected" : ""}`}
							onClick={() => setOwnerSide("random")}
							disabled={isLoading}
							hidden={true}
						/>
						<label
							htmlFor="side-random"
							className={`slider slider-end ${ownerSide === "random" ? "slider-selected" : ""} ${isLoading ? "disabled" : ""}`}
						>
							Random
						</label>
					</div>

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
