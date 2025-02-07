import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { msalInstance } from "../main";

function getMsalAccount() {
	const currentAccounts = msalInstance.getAllAccounts();
	const filteredAccounts = currentAccounts.filter(
		(a) => a.environment === "chessapp.b2clogin.com"
	);

	if (filteredAccounts.length === 0) {
		return null;
	}
	if (filteredAccounts.length > 1) {
		console.warn("Multiple accounts detected");
		return null;
	}

	return filteredAccounts[0];
}

export async function getAuthorizationHeader() {
	const account = getMsalAccount();
	if (!account) {
		console.warn("No account!");
		return null;
	}
	const tokenRequest = {
		scopes: ["https://chessapp.onmicrosoft.com/chess-app-api/Api.General"],
		account: account,
	};

	try {
		const result = await msalInstance.acquireTokenSilent(tokenRequest);
		return `Bearer ${result.accessToken}`;
	} catch (error) {
		if (error instanceof InteractionRequiredAuthError) {
			// need user to go through auth flow via browser
			await msalInstance.acquireTokenRedirect(tokenRequest);
			return null;
		}
		console.error("Got error from msal", error);
		return null;
	}
}
