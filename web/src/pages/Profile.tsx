import { getMsalAccount } from "./getAuthorizationHeader";

export function Profile() {
	const username = getMsalAccount()?.name;
	const userEmail = getMsalAccount()?.username;
	return (
		<>
			{" "}
			Username: {username} Email Address: {userEmail}
		</>
	);
}
