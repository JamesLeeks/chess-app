import React, { useState } from 'react';
import './App.css';

type SquareType = "dark" | "light";
type PieceType =
  "rook" |
  "knight" |
  "bishop" |
  "king" |
  "queen" |
  "pawn";
type PieceColour = "black" | "white";
type BoardSquare = ChessPiece | undefined

interface Position {
  row: number,
  column: number
}
interface SquareProps {
  squareType: SquareType,
  chessPiece?: ChessPiece,
  selected?: boolean,
  onSquareClick: () => void
}
interface ChessPiece {
  colour: PieceColour,
  type: PieceType
}

function Square(props: SquareProps) {
  // split props out like with an array
  const { squareType, chessPiece, selected, onSquareClick } = props;
  // if chessPiece: build up the class name. else: just make it an empty string
  const pieceClass = chessPiece ? `${chessPiece.colour}-${chessPiece.type}` : ""
  //build up the class name
  const squareClass = `${squareType}-square${selected ? "-selected" : ""}`

  return (
    <span className={`${squareClass} ${pieceClass}`} onClick={onSquareClick}></span>
  )
}

function Board() {
  const [piecePositions, setPiecePositions] = useState<BoardSquare[][]>([
    [{ colour: 'black', type: 'rook' }, { colour: 'black', type: 'knight' }, { colour: 'black', type: 'bishop' }, { colour: 'black', type: 'queen' }, { colour: 'black', type: 'king' }, { colour: 'black', type: 'bishop' }, { colour: 'black', type: 'knight' }, { colour: 'black', type: 'rook' }],
    Array(8).fill({ pieceColour: 'black', pieceType: 'pawn' }),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill({ pieceColour: 'white', pieceType: 'pawn' }),
    [{ colour: 'white', type: 'rook' }, { colour: 'white', type: 'knight' }, { colour: 'white', type: 'bishop' }, { colour: 'white', type: 'queen' }, { colour: 'white', type: 'king' }, { colour: 'white', type: 'bishop' }, { colour: 'white', type: 'knight' }, { colour: 'white', type: 'rook' }],
  ]);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [currentTurn, setCurrentTurn] = useState<PieceColour>("white");

  function movePiece(from: Position, to: Position) {
    const newPiecePositions = piecePositions.slice()
    newPiecePositions[to.row][to.column] = piecePositions[from.row][from.column]
    newPiecePositions[from.row][from.column] = undefined
    setPiecePositions(newPiecePositions)
    setSelectedSquare(null)
  }



  function handleClick(row: number, column: number) {
    if (selectedSquare) {
      // have a selected piece - move it
      if (piecePositions[row][column]?.colour === currentTurn) {
        setSelectedSquare({ row: row, column: column })
      } else {
        movePiece(selectedSquare, { row: row, column: column })
        // switch turn
        if (currentTurn === "white") {
          setCurrentTurn("black")
        } else {
          setCurrentTurn("white")
        }
      }
    } else {
      // picking a piece
      // if there is a piece on this square and it's their turn
      if (piecePositions[row][column] && currentTurn === piecePositions[row][column]?.colour) {
        setSelectedSquare({ row: row, column: column })
      } else {
        setSelectedSquare(null)
        return
      }
    }
  }

  const boardContent = [];
  // for each row:
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    // build up rows that are <div><Square... /><Square... /> .... </div>
    // rowSquares is what goes inside the <div></div>
    const rowSquares = []
    // for each column:
    let squareType: SquareType = 'light'
    if (rowIndex % 2 > 0) {
      squareType = 'dark'
    }
    for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
      const square = <Square key={`column-${columnIndex}}`}
        squareType={squareType}
        // look up position from piecePosition
        chessPiece={piecePositions[rowIndex][columnIndex]}
        selected={selectedSquare?.row === rowIndex && selectedSquare?.column === columnIndex}
        onSquareClick={() => handleClick(rowIndex, columnIndex)} />
      // add square to rowSquares
      rowSquares.push(square);

      if (squareType === 'light') {
        squareType = 'dark'
      } else {
        squareType = 'light'
      }
    }
    // wrap the Squares in a div
    const row = <div key={`row-${rowIndex}}`}>{rowSquares}</div>
    // add row to the board
    boardContent.push(row);
  }

  return (
    <>
      <div className='board'>
        {boardContent}
      </div>
    </>
  );
}

function App() {
  return (<Board />)
}

export default App;
