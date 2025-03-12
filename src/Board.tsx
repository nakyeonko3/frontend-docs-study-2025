import { css } from "@emotion/react";
import Square from "./Square";
import { useState } from "react";
import { PlayerType } from "./type";
import calculateWinner from "./calculateWinner";

function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<Array<PlayerType>>(Array(9).fill(""));
  const [winner, setWinner] = useState<PlayerType | "draw" | null>(null);

  const handleClick = (index: number) => {
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "player1";
    } else {
      nextSquares[index] = "player2";
    }
    const winner = calculateWinner(nextSquares);
    if (winner) {
      setWinner(winner);
    }
    setXIsNext((next) => !next);
    setSquares(nextSquares);
  };

  const winnerMessage =
    winner === "draw" ? "Draw!" : winner ? `${winner} wins!` : "";

  return (
    <div css={boardStyle}>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div>{winnerMessage}</div>
    </div>
  );
}

const boardStyle = css`
  display: flex;
  flex-direction: column;
  .board-row {
    display: flex;
    flex-direction: row;
  }
`;

export default Board;
