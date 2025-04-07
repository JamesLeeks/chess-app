import { useState } from "react";
import { BoardComponent } from "./Board";
import { Game } from "../../../common/src/game";
import {
	HistoryItem,
	PieceColour,
	Position,
	PromotionType,
} from "../../../common/src/models";
import { HistoryComponent } from "./History";
import { ClockComponent } from "./Clock";
import { ResultComponent } from "./Result";
import { getMsalAccount } from "../pages/getAuthorizationHeader";

export type GameComponentParams = {
	game: Game;
	makeMove: (
		from: Position,
		to: Position,
		promotionType?: PromotionType
	) => void;
	defaultSide?: PieceColour;
	allowedSides: PieceColour[];
};

function getUserSide(
	game: Game,
	defaultSide: PieceColour | undefined
): PieceColour | null {
	const userId = getMsalAccount()?.localAccountId;

	if (defaultSide) {
		return defaultSide;
	}
	if (!userId) {
		throw new Error("User should be logged in");
	}
	return game.getUserColour(userId);
}

export function GameComponent(params: GameComponentParams) {
	// game state properties
	const game = params.game;
	const defaultSide = params.defaultSide;
	const allowedSides = params.allowedSides;
	const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
	const [moveOptions, setMoveOptions] = useState<Position[]>([]);
	const [promotionSquare, setPromotionSquare] = useState<Position | null>(
		null
	);
	const [selectedHistoryItem, setSelectedHistoryItem] =
		useState<HistoryItem | null>(null);
	const [timerUpdate, setTimeUpdate] = useState(0);
	const userId = getMsalAccount()?.localAccountId;

	if (!userId && !defaultSide) {
		throw new Error("User should be logged in");
	}
	const userSide = getUserSide(game, defaultSide);

	// function isUsersTurn(): boolean {
	// 	return !!allowedSides.find((s) => s === game.currentTurn);
	// }
	// function getMovableSide(): PieceColour | null {
	// 	// return current turn if the user is allowed to play for that side
	// 	if (game.currentTurn && isUsersTurn()) {
	// 		return game.currentTurn;
	// 	}
	// 	return null;
	// }

	function getMovableSide() {
		return allowedSides.find((s) => s === game.currentTurn) ?? null;
	}

	function isUsersTurn(): boolean {
		return !!getMovableSide();
	}

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
		// TODO: FIND EVERYWHERE WE ARE SELECTING A SQUARE AND PUT IN A CHECK TO MAKE SURE THAT THE PIECE BELONGS TO THE PLAYER
		if (selectedSquare) {
			// there's a selected piece
			if (game.board[row][column]?.colour === game.currentTurn) {
				// switch selected square - player has clicked on a different piece of their own colour
				if (isUsersTurn()) {
					// if the piece belongs to the player
					const newSelectedSquare = { row: row, column: column };
					setSelectedSquare({ row: row, column: column });
					setMoveOptions(game.getMoveOptions(newSelectedSquare));
				}
			} else {
				// player has clicked on an empty square or opponent's piece
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
			console.log("picking a piece", {
				currentTurn: game.currentTurn,
				userColour: userSide,
			});
			if (
				game.board[row][column] && // has piece on this square
				game.currentTurn === game.board[row][column]?.colour // piece for the current turn
			) {
				// if there is a piece on this square and it's their turn:
				// set selected square and show move options
				if (isUsersTurn()) {
					// if the piece belongs to the player
					const newSelectedSquare = { row: row, column: column };
					setSelectedSquare(newSelectedSquare);
					setMoveOptions(game.getMoveOptions(newSelectedSquare));
				}
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

	const playerTime = userSide === "white" ? game.whiteTime : game.blackTime;
	const opponentTime = userSide === "white" ? game.blackTime : game.whiteTime;

	return (
		<>
			<div className="game">
				<div className="clock-panel">
					<ClockComponent
						time={opponentTime}
						isActive={game.currentTurn !== userSide}
					/>
					<ClockComponent
						time={playerTime}
						isActive={game.currentTurn === userSide}
					/>
				</div>
				<div className={`board-panel ${userSide}`}>
					<BoardComponent
						board={boardToUse}
						handleClick={handleClick}
						moveOptions={moveOptions}
						selectedSquare={selectedSquare}
						movableSide={getMovableSide()}
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
