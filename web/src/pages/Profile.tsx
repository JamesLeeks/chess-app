import { useEffect, useState } from "react";
import { getApiBase } from "../getApiBase";
import { useNavigate } from "react-router-dom";
import {
	getAuthorizationHeader,
	// getMsalAccount,
} from "./getAuthorizationHeader";
import { User } from "../../../common/src/models";

export function Profile() {
	const [responseStatus, setResponseStatus] = useState<number | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
	// const userEmail = getMsalAccount()?.username;

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
			setResponseStatus(response.status);
			if (response.status === 404) {
				console.log("TODO: get user to create username");
				navigate("/account/new");
				return;
			}
			if (!response.ok) {
				return;
			}
			const responseBody = await response.json();
			console.log("user: ", { responseBody });
			setUser(responseBody);
		})();
	}, []);

	if (responseStatus === 404) {
		return <>404 User not found.</>;
	}

	if (responseStatus && responseStatus >= 300) {
		return <>Error code {responseStatus}</>;
	}

	return (
		<>
			{/* {" "}
			Username: {user?.username} Email Address: {userEmail} */}
			{user?.username}
		</>
	);
}
