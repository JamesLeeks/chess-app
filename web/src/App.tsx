import { Link, Outlet, Route, Routes } from "react-router-dom";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";

import { Home } from "./pages/Home";
import { CreateGame } from "./pages/CreateGame";
import { Play } from "./pages/Play";
import { LocalGame } from "./pages/LocalGame";
import { Profile } from "./pages/Profile";
import { CreateAccount } from "./pages/CreateUser";
import { UpdateAccount } from "./pages/UpdateUser";
import { ConfirmEmail } from "./pages/ConfirmEmail";

import "./css/App.css";
import { Games } from "./pages/Games";

function App({ instance }: { instance: PublicClientApplication }) {
	return (
		<>
			<MsalProvider instance={instance}>
				<div className="layout">
					<div className="banner">
						{/* <button className="button">Home</button>
									<button className="button">Profile</button> */}
						<Link className="button" to="/">
							Home
						</Link>
						<Link className="button" to="/account">
							Profile
						</Link>
					</div>
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
							<Route path="/games" element={<Games />} />
							<Route path="/account" element={<Profile />}></Route>
							<Route
								path="/account/update"
								element={<UpdateAccount />}
							></Route>
							<Route
								path="/account/new"
								element={<CreateAccount />}
							></Route>
							<Route
								path="/account/confirm"
								element={<ConfirmEmail />}
							></Route>
						</Route>
					</Routes>
				</div>
			</MsalProvider>
		</>
	);
}

export default App;
