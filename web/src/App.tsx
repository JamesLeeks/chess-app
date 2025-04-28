import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateGame } from "./pages/CreateGame";
import { Play } from "./pages/Play";
import { LocalGame } from "./pages/LocalGame";
import { Home } from "./pages/Home";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { Profile } from "./pages/Profile";

function App({ instance }: { instance: PublicClientApplication }) {
	return (
		<>
			<MsalProvider instance={instance}>
				<Routes>
					{/* Unauthenticated pages */}
					<Route path="/" element={<Home />} />
					<Route path="/play/local" element={<LocalGame />} />

					{/* Pages that need the user signed in */}
					<Route
						element={
							<MsalAuthenticationTemplate
								interactionType={InteractionType.Redirect}
							>
								<Outlet />
							</MsalAuthenticationTemplate>
						}
					>
						{/* <Route path="/play/" element={<ListGames />} /> */}
						<Route path="/play/new" element={<CreateGame />} />
						<Route path="/play/:id" element={<Play />} />
						<Route path="/profile" element={<Profile />}></Route>
					</Route>
				</Routes>
			</MsalProvider>
		</>
	);
}

export default App;
