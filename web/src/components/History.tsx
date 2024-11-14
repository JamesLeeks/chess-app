import { HistoryItem } from "../../../common/src/models";

export type HistoryProps = {
	history: HistoryItem[];
	selectedHistoryItem: HistoryItem;
	onNotationClicked: (historyIndex: number) => void;
};

export function HistoryComponent(props: HistoryProps) {
	const historyElements: JSX.Element[] = [];
	// split props out like with an array
	const { history, selectedHistoryItem, onNotationClicked } = props;

	for (let index = 0; index < history.length; index += 2) {
		const historyItemA = history[index];
		const historyItemB = history[index + 1];
		historyElements.push(
			<div className="history-item" key={`history-${index}`}>
				{index / 2 + 1}.{" "}
				<span
					className={
						historyItemA === selectedHistoryItem
							? "selected-history-item"
							: ""
					}
					onClick={() => onNotationClicked(index)}
				>
					{historyItemA.notation}
				</span>{" "}
				{historyItemB ? (
					<span
						className={
							historyItemB === selectedHistoryItem
								? "selected-history-item"
								: ""
						}
						onClick={() => onNotationClicked(index + 1)}
					>
						{historyItemB.notation}
					</span>
				) : (
					<>...</>
				)}
			</div>
		);
	}

	if (historyElements.length === 0) {
		historyElements.push(
			<div className="history-item" key={"history-0"}>
				1. ...
			</div>
		);
	}

	return (
		<>
			<div className="history history-panel-item">{historyElements}</div>
		</>
	);
}
