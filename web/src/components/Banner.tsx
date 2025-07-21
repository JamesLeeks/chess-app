import { LocalGame } from "../pages/LocalGame";

export function BannerPage() {
	return (
		<>
			<div className="banner-grid">
				<div className="banner"></div>
				<div>
					<LocalGame />
				</div>
			</div>
		</>
	);
}
