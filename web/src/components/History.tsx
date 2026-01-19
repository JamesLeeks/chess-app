import { useEffect, useRef } from "react";
import { HistoryItem } from "../../../common/src/models";

export type HistoryProps = {
	history: HistoryItem[];
	selectedHistoryItem: HistoryItem;
	onNotationClicked: (historyIndex: number) => void;
	onArrowClicked: (direction: 1 | -1) => void;
};

export function HistoryComponent(props: HistoryProps) {
	const historyElements: JSX.Element[] = [];
	// split props out like with an array
	const { history, selectedHistoryItem, onNotationClicked, onArrowClicked } =
		props;

	const selectedRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		// Register a keydown event listener
		function handleKeyDown(event: KeyboardEvent) {
			console.log(event.key);
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				onArrowClicked(-1);
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				onArrowClicked(1);
			}
		}
		document.addEventListener("keydown", handleKeyDown);

		// Return a function for React to call when the component unmounts
		// to clean up the event listener
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onArrowClicked]);

	useEffect(() => {
		// selected ref = what the ref currently points to
		if (selectedRef.current) {
			selectedRef.current.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, [selectedHistoryItem]);

	for (let index = 0; index < history.length; index += 2) {
		const historyItemA = history[index];
		const historyItemB = history[index + 1];
		historyElements.push(
			<div className="history-item" key={`history-${index}`}>
				{/* move number */}
				<span className="move-number">{index / 2 + 1}.</span>{" "}
				<span
					className={
						historyItemA === selectedHistoryItem
							? "selected-history-item"
							: ""
					}
					// set ref if this is the selected history item
					ref={
						historyItemA === selectedHistoryItem ? selectedRef : undefined
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
						// set ref if this is the selected history item
						ref={
							historyItemB === selectedHistoryItem
								? selectedRef
								: undefined
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
				<span className="move-number">1.</span> ...
			</div>
		);
	}
	// document.getElementsByClassName("selected-history-item")[0].scrollIntoView()

	return (
		<>
			<div className="history history-panel-item">{historyElements}</div>
			<div className="arrows history-panel-item">
				<button className="arrow-button" onClick={() => onArrowClicked(-1)}>
					-
				</button>
				<button className="arrow-button" onClick={() => onArrowClicked(1)}>
					+
				</button>
			</div>
		</>
	);
}
