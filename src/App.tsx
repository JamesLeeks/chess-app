import React from 'react';
import './App.css';

type SquareType = "dark" | "light";
type ChessPiece = "white-rook"; // TODO: complete this list ;-p

function Square({ squareType }: { squareType: SquareType }) {
  return (
    <span className={`${squareType}-square`}></span>
  )
}

function Board() {
  const boardIndexes = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <>
      <div className='board'>
        {boardIndexes.map(rowIndex =>
          <div>
            {boardIndexes.map(columnIndex => (columnIndex + rowIndex) % 2)
              .map(x => x === 0 ? "light" : "dark")
              .map(squareType => <Square squareType={squareType} />)}
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (<Board />)
}

export default App;
