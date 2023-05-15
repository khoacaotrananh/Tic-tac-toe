import { useState } from "react";
import "./styles.css";


function calculateWinner(squares) {
  const winlines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winlines.length; i++) {
    const [a, b, c] = winlines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Square({ value, onSquareClick }) {
  return (
    <button className="square-btn" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Board({XisNext, squares, onPlay}) {
  
  function handleSquareClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    let nextSquares = squares.slice();
    if (XisNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares);
  }

  function handleResetBoard() {
    return;
  }

  const winner = calculateWinner(squares);
  let status = null;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (XisNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
      <button className="board-reset-btn" onClick={handleResetBoard}>
        Reset board
      </button>
    </>
  );
}

export default function Game () {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const XisNext = currentMove % 2 === 0;
  
  function handlePlay (nextSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1)
  }
  
  function jumpTo (nextMove) {
    setCurrentMove(nextMove);
  }
  
  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = "Go to move: " + move;
    }
    else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button className="moves-btn" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  }
  );
  
  return (
    <div className="game">
      <div className="game-board">
        <Board XisNext={XisNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol className="moves-list">{moves}</ol>
      </div>
    </div>
  );
}
