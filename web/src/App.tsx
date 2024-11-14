import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Play } from "./pages/Play";
import { LocalGame } from "./pages/LocalGame";

function App() {
	return (
		<>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<LocalGame />} />
				<Route path="/play/:id" element={<Play />} />
			</Routes>
		</>
	);
}

export default App;
