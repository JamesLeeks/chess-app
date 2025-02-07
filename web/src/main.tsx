import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const msalConfig: Configuration = {
	auth: {
		clientId: "2ffd45b9-6c5e-4c85-a167-5aa28a6ede56",
		authority:
			"https://chessapp.b2clogin.com/chessapp.onmicrosoft.com/B2C_1_susi",
		knownAuthorities: ["chessapp.b2clogin.com"],
		redirectUri: "/",
		postLogoutRedirectUri: "/",
		navigateToLoginRequestUrl: true,
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: false,
	},
};
export const msalInstance = new PublicClientApplication(msalConfig);

(async function () {
	await msalInstance.initialize();

	// Optional - This will update account state if a user signs in from another tab or window
	msalInstance.enableAccountStorageEvents();

	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<BrowserRouter>
				<App instance={msalInstance} />
			</BrowserRouter>
		</StrictMode>
	);
})();
