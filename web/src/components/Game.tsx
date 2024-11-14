import { useState } from "react";
import { BoardComponent } from "./Board";
import { Game } from "../../../common/src/game";
import { getStartingBoard } from "../../../common/src/board";
import {
	HistoryItem,
	Position,
	PromotionType,
} from "../../../common/src/models";
import { HistoryComponent } from "./History";
import { ClockComponent } from "./Clock";
import { ResultComponent } from "./Result";

export type GameComponentParams = {
	game: Game;
	makeMove: (
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) => void;
};

export function GameComponent(params: GameComponentParams) {
	// game state properties
	const game = params.game;
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);
	const [promotionSquare, setPromotionSquare] = useState<Position | null>(
		null
	);
	const [selectedHistoryItem, setSelectedHistoryItem] =
		useState<HistoryItem | null>(null);
	const [timerUpdate, setTimeUpdate] = useState(0);

	function makeMove(
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) {
		// setGame(game.makeMove(from, to, promotionType));
		params.makeMove(from, to, promotionType);
	}

	function handleClick(row: number, column: number) {
		if (!game.isActive()) {
			setSelectedSquare(null);
			setMoveOptions([]);
			return;
		}
		if (selectedHistoryItem) {
			return;
		}
		setPromotionSquare(null);
		if (selectedSquare) {
			// there's a selected piece - move it
			if (game.board[row][column]?.colour === game.currentTurn) {
				// if it's their turn:
				// update selected square and move options for new selected piece
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare({ row: row, column: column });
				setMoveOptions(game.getMoveOptions(newSelectedSquare));
			} else {
				// not their turn
				const foundMoveOption = moveOptions.find(
					(pos) => pos.row === row && pos.column === column
				);
				if (foundMoveOption) {
					// clicked on a move option for the selected piece => move it!
					const promotionRow = game.currentTurn === "black" ? 7 : 0;
					if (
						game.board[selectedSquare.row][selectedSquare.column]
							?.type === "pawn" &&
						row === promotionRow
					) {
						setPromotionSquare({ row: row, column: column });
						return;
					}
					makeMove(selectedSquare, { row: row, column: column });
				}
				setSelectedSquare(null);
				setMoveOptions([]);
			}
		} else {
			// picking a piece
			// if there is a piece on this square and it's their turn
			if (
				game.board[row][column] &&
				game.currentTurn === game.board[row][column]?.colour
			) {
				// set selected square and show move options
				const newSelectedSquare = { row: row, column: column };
				setSelectedSquare(newSelectedSquare);
				setMoveOptions(game.getMoveOptions(newSelectedSquare));
			} else {
				// clear selected piece and move options
				setSelectedSquare(null);
				setMoveOptions([]);
			}
		}
	}

	function handleHistoryItemSelected(index: number) {
		setSelectedSquare(null);
		setMoveOptions([]);

		const latestItemIndex = game.history.length - 1;
		if (index === latestItemIndex) {
			setSelectedHistoryItem(null);
		} else {
			setSelectedHistoryItem(game.history[index]);
		}
	}

	function promote(
		from: Position,
		to: Position,
		promotionType: PromotionType
	) {
		makeMove(from, to, promotionType);
		setSelectedSquare(null);
		setMoveOptions([]);
		setPromotionSquare(null);
	}

	function updateClock() {
		setTimeUpdate(timerUpdate + 1);
	}

	if (game.isActive()) {
		const currentTurnTime =
			game.currentTurn === "white" ? game.whiteTime : game.blackTime;
		if (currentTurnTime > 30) {
			setTimeout(updateClock, 500);
		} else {
			setTimeout(updateClock, 100);
		}
	}

	const boardToUse = selectedHistoryItem
		? selectedHistoryItem.boardAfterMove
		: game.board;

	return (
		<>
			<div className="game">
				<div className="clock-panel">
					<ClockComponent
						time={game.blackTime}
						isActive={game.currentTurn === "black"}
					/>
					<ClockComponent
						time={game.whiteTime}
						isActive={game.currentTurn === "white"}
					/>
				</div>
				<div className="board-panel">
					<BoardComponent
						board={boardToUse}
						handleClick={handleClick}
						moveOptions={moveOptions}
						selectedSquare={selectedSquare}
					/>
					{selectedSquare && promotionSquare && (
						<div>
							<button
								className={`promotion-button ${game.currentTurn}-queen`}
								onClick={() => {
									promote(selectedSquare, promotionSquare, "queen");
								}}
							>
								queen
							</button>

							<button
								className="promotion-button"
								onClick={() => {
									promote(selectedSquare, promotionSquare, "knight");
								}}
							>
								knight
							</button>

							<button
								className="promotion-button"
								onClick={() => {
									promote(selectedSquare, promotionSquare, "bishop");
								}}
							>
								bishop
							</button>

							<button
								className="promotion-button"
								onClick={() => {
									promote(selectedSquare, promotionSquare, "rook");
								}}
							>
								rook
							</button>
						</div>
					)}
				</div>

				<div className="history-panel">
					{!game.isActive() && (
						<ResultComponent
							gameResult={game.getGameResult()}
						></ResultComponent>
					)}
					<HistoryComponent
						history={game.history}
						selectedHistoryItem={
							selectedHistoryItem ??
							game.history[game.history.length - 1]
						}
						onNotationClicked={handleHistoryItemSelected}
					></HistoryComponent>
				</div>
			</div>
		</>
	);
}
