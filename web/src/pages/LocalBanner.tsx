import { Link } from "react-router-dom";
import { LocalGame } from "./LocalGame";

export function BannerPage() {
	return (
		<>
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
				<LocalGame />
			</div>
		</>
	);
}
