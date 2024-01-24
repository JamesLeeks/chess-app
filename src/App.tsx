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
  pieceColour: PieceColour,
  pieceType: PieceType
}

function Square(props: SquareProps) {
  // split props out like with an array
  const { squareType, chessPiece, selected, onSquareClick } = props;
  // if chessPiece: build up the class name. else: just make it an empty string
  const pieceClass = chessPiece ?  `${chessPiece.pieceColour}-${chessPiece.pieceType}` : ""
  //build up the class name
  const squareClass = `${squareType}-square${selected ? "-selected" : ""}`

  return (
    // TODO: move square stuff to new SquareClass variable
    <span className={`${squareClass} ${pieceClass}`} onClick={onSquareClick}></span>
  )
}

function Board() {
  const piecePositions: ChessPiece[][] = [
    [{pieceColour: 'black', pieceType: 'rook'}, {pieceColour: 'black', pieceType: 'knight'}, {pieceColour: 'black', pieceType: 'bishop'}, {pieceColour: 'black', pieceType: 'queen'}, {pieceColour: 'black', pieceType: 'king'}, {pieceColour: 'black', pieceType: 'bishop'}, {pieceColour: 'black', pieceType: 'knight'}, {pieceColour: 'black', pieceType: 'rook'}],
    Array(8).fill({pieceColour: 'black', pieceType: 'pawn'}),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill({pieceColour: 'white', pieceType: 'pawn'}),
    [{pieceColour: 'white', pieceType: 'rook'}, {pieceColour: 'white', pieceType: 'knight'}, {pieceColour: 'white', pieceType: 'bishop'}, {pieceColour: 'white', pieceType: 'queen'}, {pieceColour: 'white', pieceType: 'king'}, {pieceColour: 'white', pieceType: 'bishop'}, {pieceColour: 'white', pieceType: 'knight'}, {pieceColour: 'white', pieceType: 'rook'}],
  ]
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);

  function handleClick(row: number, column: number) {
    if (!piecePositions[row][column]) {
      setSelectedSquare(null)
      return
    }
    setSelectedSquare({ row: row, column: column })
  }
  // const boardIndexes = [0, 1, 2, 3, 4, 5, 6, 7]

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
      const square = <Square
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
    const row = <div>{rowSquares}</div>
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
