import React, { useState } from 'react';
import './App.css';

type SquareType = "dark" | "light";
type ChessPiece =
  "white-rook" |
  "white-knight" |
  "white-bishop" |
  "white-king" |
  "white-queen" |
  "white-pawn" |
  "black-rook" |
  "black-knight" |
  "black-bishop" |
  "black-king" |
  "black-queen" |
  "black-pawn";

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
function Square(props: SquareProps) {
  // split props out like with an array
  const { squareType, chessPiece, selected, onSquareClick } = props;
  return (
    <span className={`${squareType}-square${selected ? "-selected" : ""} ${chessPiece}`} onClick={onSquareClick}></span>
  )
}


function Board() {
  const piecePositions: ChessPiece[][] = [
    ["black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook"],
    Array(8).fill("black-pawn"),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill(undefined),
    Array(8).fill("white-pawn"),
    ["white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"],
  ]
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  
  function handleClick(row: number, column: number) {
    if (!piecePositions[row][column]) {
      setSelectedSquare(null)
      return
    }
    setSelectedSquare({row: row, column: column})
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
