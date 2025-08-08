export type ResultProps = {
	gameResult: string | undefined;
};

export function ResultComponent(props: ResultProps) {
	if (props.gameResult) {
		return (
			<>
				<div className="result history-panel-item">
					{props.gameResult}
					{/* <div className="result-text">{props.gameResult}</div> */}
					{/* <div className="result-button-container">
						<button className="result-button">Home</button>{" "}
						<button className="result-button">Rematch</button>
					</div> */}
				</div>
			</>
		);
	} else {
		return <></>;
	}
}
