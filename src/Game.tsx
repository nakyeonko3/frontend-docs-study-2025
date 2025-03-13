import { css } from "@emotion/react";
import { useState } from "react";
import { PlayerType } from "./type";
import calculateWinner from "./calculateWinner";
import Board from "./Board";
import MoveHistory from "./MoveHistory";

function Game() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<Array<PlayerType>>(Array(9).fill(""));
  const [winner, setWinner] = useState<PlayerType | "draw" | null>(null);
  const [history, setHistory] = useState<Array<Array<PlayerType>>>([]);

  const handleClick = (index: number) => {
    if (winner || squares[index]) return;
    const nextSquares = [...squares];

    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    const gameWinner = calculateWinner(nextSquares);
    if (gameWinner === "draw" || gameWinner) {
      setWinner(gameWinner);
    }
    setXIsNext((next) => !next);
    setHistory((prev) => [...prev, nextSquares]);
    setSquares(nextSquares);
  };

  const winnerMessage =
    winner === "draw" ? "Draw!" : winner ? `${winner} Wins!` : "";

  const jumpTo = (index: number) => {
    if (index >= history.length) return;
    setHistory((prev) => prev.slice(0, index + 1));
    setSquares(history[index]);
    setXIsNext(index % 2 === 0);
    setWinner(null);
  };

  const resetGame = () => {
    setHistory([]);
    setSquares(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
  };

  const currentTurn = xIsNext ? "X's Turn" : "O's Turn";

  return (
    <>
      <div css={GameStyle}>
        <div css={winnerMessageStyle(winner)}>
          <div>{winnerMessage}</div>
          <button onClick={resetGame}> Play Again! </button>
        </div>
        <div>
          <div css={turnStyle(xIsNext)}>{currentTurn}</div>
          <Board squares={squares} handleClick={handleClick} />
        </div>
        <MoveHistory history={history} jumpTo={jumpTo} />
      </div>
    </>
  );
}

const turnStyle = (xIsNext: boolean) => css`
  font-weight: bold;
  font-size: 1.5rem;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${xIsNext ? "#ff69b4" : "#6495ed"};
`;

const GameStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
`;

const winnerMessageStyle = (winner: PlayerType | "draw" | null) => css`
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 4.5rem;
  z-index: 1000;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${winner === "X" ? "#ff69b4" : winner === "O" ? "#6495ed" : "#fff"};

  button {
    opacity: ${winner ? 1 : 0};
    display: ${winner ? "block" : "none"};
    background-color: ${winner ? "#fff" : "#333"};
    color: ${winner ? "#333" : "#fff"};
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: ${winner ? "#333" : "#fff"};
      color: ${winner ? "#fff" : "#333"};
    }
  }
`;

export default Game;
