import { HistoryItem } from "../core/models";

export type HistoryComponentParameters = {
	history: HistoryItem[];
};

export function HistoryComponent({ history }: HistoryComponentParameters) {
	const historyElements: JSX.Element[] = [];

	for (let index = 0; index < history.length; index += 2) {
		const historyItemA = history[index];
		const historyItemB = history[index + 1];
		historyElements.push(
			<div className="history-item">
				{index / 2 + 1}. {historyItemA.notation}{" "}
				{historyItemB?.notation ?? "..."}
			</div>
		);
	}

	if (historyElements.length === 0) {
		historyElements.push(<div className="history-item">1. ...</div>);
	}

	return (
		<>
			<div className="history">{historyElements}</div>
		</>
	);
}
