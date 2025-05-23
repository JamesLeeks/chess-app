import { useNavigate } from "react-router-dom";
import { getApiBase } from "../getApiBase";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { useState } from "react";

export function CreateAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [username, setUsername] = useState<string | undefined>(undefined);
	const [message, setMessage] = useState<string | undefined>(undefined);

	const navigate = useNavigate();

	async function onClick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}

		if (!username) {
			throw new Error("Username should have value");
		}

		const response = await fetch(`${getApiBase()}/account`, {
			headers: {
				"content-type": "application/json",
				Authorization: authHeader,
			},
			body: JSON.stringify({
				username: username,
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
			navigate("/");
		}
		return;
	}

	return (
		<>
			<div>{message}</div>
			<input
				type="string"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				disabled={isLoading}
			/>

			<button onClick={onClick} disabled={isLoading}>
				Confirm
			</button>
		</>
	);
}
