import { GameResultFull } from "../core/models";

export type ResultProps = {
	gameResult: GameResultFull | undefined;
};

export function ResultComponent(props: ResultProps) {
	if (props.gameResult) {
		return (
			<>
				<div className="result history-panel-item">
					<div className="result-text">
						{props.gameResult.result} due to {props.gameResult.reason}
					</div>
					<div className="result-button-container">
						<button className="result-button">Home</button>{" "}
						<button className="result-button">Rematch</button>
					</div>
				</div>
			</>
		);
	} else {
		return <></>;
	}
}
