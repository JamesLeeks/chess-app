import { Link } from "react-router-dom";
// import "../Home.css";

export function Home() {
	return (
		<>
			<div className="container">
				<ul className="home-actions">
					<li>
						<Link className="home-button" to="/play/new">
							new game
						</Link>
					</li>
					<li>
						<Link className="home-button" to="">
							my games
						</Link>
					</li>
					<li>
						<Link className="home-button" to="/play/local">
							local game
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}
