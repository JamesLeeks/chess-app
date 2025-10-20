import { useState } from "react";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { getApiBase } from "../getApiBase";

export function ConfirmEmail() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | undefined>(undefined);
	const [ok, setOk] = useState<boolean>(false);

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

		if (response.ok) {
			setOk(true);
		}
		return;
	}

	if (ok) {
		return (
			<>
				<div className="success-banner">
					Email address confirmation successful. You can safely close this
					tab.
				</div>
			</>
		);
	}

	return (
		<>
			<div className="error-message">{message}</div>
			<button onClick={onClick} disabled={isLoading}>
				Confirm Email
			</button>
		</>
	);
}
