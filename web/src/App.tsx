import { Outlet, Route, Routes } from "react-router-dom";
import "./css/App.css";
import { CreateGame } from "./pages/CreateGame";
import { Play } from "./pages/Play";
import { Home } from "./pages/Home";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { Profile } from "./pages/Profile";
import { CreateAccount } from "./pages/CreateUser";
import { BannerPage } from "./components/Banner";

function App({ instance }: { instance: PublicClientApplication }) {
	return (
		<>
			<MsalProvider instance={instance}>
				<Routes>
					{/* Unauthenticated pages */}
					<Route path="/" element={<Home />} />
					<Route path="/play/local" element={<BannerPage />} />

					{/* Pages that need the user signed in */}
					<Route
						element={
							<MsalAuthenticationTemplate
								interactionType={InteractionType.Redirect}
							>
								{/* <RequireAccount> */}{" "}
								{/* TODO: add RequireAccount component */}
								<Outlet />
								{/* </RequireAccount> */}
							</MsalAuthenticationTemplate>
						}
					>
						{/* <Route path="/play/" element={<ListGames />} /> */}
						<Route path="/play/new" element={<CreateGame />} />
						<Route path="/play/:id" element={<Play />} />
						<Route path="/account" element={<Profile />}></Route>
						<Route
							path="/account/update"
							element={<CreateAccount />}
						></Route>
					</Route>
				</Routes>
			</MsalProvider>
		</>
	);
}

export default App;
