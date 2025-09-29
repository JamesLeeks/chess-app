import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { useEffect, useState } from "react";
import { User } from "../../../common/src/models";

// TODO: email confirmation

export function CreateAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | undefined>(undefined);

	const [user, setUser] = useState<User | null>(null);

	const [enteredUsername, setEnteredUsername] = useState<string | undefined>(
		undefined
	);
	const [enteredEmail, setEnteredEmail] = useState<string | undefined>(
		undefined
	);

	const navigate = useNavigate();

	useEffect(() => {
		(async function getUser() {
			const authHeader = await getAuthorizationHeader();
			if (!authHeader) {
				return;
			}

			const response = await fetch(`${getApiBase()}/account`, {
				headers: { Authorization: authHeader },
				method: "GET",
			});

			if (response.status === 404) {
				console.log("TODO: get user to create username");
				navigate("/account/update");
				return;
			}
			if (!response.ok) {
				return;
			}

			const responseBody = await response.json();
			console.log("user: ", { responseBody });
			setUser(responseBody);

			setEnteredUsername(responseBody?.username);
			setEnteredEmail(responseBody?.email);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function onClick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}

		if (!enteredUsername) {
			throw new Error("Username should have value");
		}
		if (!enteredEmail) {
			throw new Error(`email should have value ${enteredEmail}`);
		}

		// goes to account controller
		const response = await fetch(`${getApiBase()}/account`, {
			headers: {
				"content-type": "application/json",
				Authorization: authHeader,
			},
			body: JSON.stringify({
				username: enteredUsername,
				email: enteredEmail,
			}),
			method: "POST",
		});

		if (response.status === 422) {
			const responseJson = await response.json();
			const responseMessage = responseJson.errors[0].errorMessage;
			setMessage(responseMessage);
		}

		// const responseBody = await response.json();
		// const id = responseBody.id;

		if (response.ok) {
			navigate("/account");
		}
		return;
	}

	return (
		<>
			{/* {" "}
			Username: {user?.username} Email Address: {userEmail} */}
			<div className="profile-container">
				<div className="profile-content">
					<div>{message}</div>

					<label
						className={user?.email ? "input-text" : "input-text-red"}
						htmlFor="username"
					>
						{user?.email ? "Username" : "Please enter username"}
					</label>

					<input
						className="profile-field"
						type="string"
						id="username"
						value={enteredUsername ?? user?.username}
						onChange={(e) => setEnteredUsername(e.target.value)}
						disabled={isLoading}
					/>

					<label
						className={user?.email ? "input-text" : "input-text-red"}
						htmlFor="email"
					>
						{user?.email ? "Email" : "Please enter email"}
					</label>

					<input
						className="profile-field"
						type="string"
						id="email"
						value={enteredEmail ?? user?.email}
						onChange={(e) => setEnteredEmail(e.target.value)}
						disabled={isLoading}
					/>

					<button
						className="profile-button"
						onClick={onClick}
						disabled={isLoading}
					>
						Confirm
					</button>
				</div>
			</div>
		</>
	);
}
