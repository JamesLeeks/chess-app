import { useState } from "react";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { getApiBase } from "../getApiBase";
import { useNavigate } from "react-router-dom";

// TODO: deal with validate error from UserService.ts line 140

export function ConfirmEmail() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | undefined>(undefined);
	const navigate = useNavigate();

	async function onClick() {
		setIsLoading(true);

		// call api
		const authHeader = await getAuthorizationHeader();
		if (!authHeader) {
			return;
		}

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const token = urlParams.get("token");
		console.log({ token });

		// goes to account controller
		const response = await fetch(`${getApiBase()}/account/confirm/${token}`, {
			headers: {
				"content-type": "application/json",
				Authorization: authHeader,
			},
			method: "POST",
		});

		console.log(response);

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
			TEST PAGE
			<div className="error-message">{message}</div>
			<button onClick={onClick} disabled={isLoading}>
				Confirm Email
			</button>
		</>
	);
}
