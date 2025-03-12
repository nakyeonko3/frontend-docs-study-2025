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
      nextSquares[index] = "player1";
    } else {
      nextSquares[index] = "player2";
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

  return (
    <div css={boardStyle}>
      <div css={winnerMessageStyle(winner)}>
        <div>{winnerMessage}</div>
        <button onClick={resetGame}> Play Again! </button>
      </div>
      <Board squares={squares} handleClick={handleClick} />
      <MoveHistory history={history} jumpTo={jumpTo} />
    </div>
  );
}

const boardStyle = css`
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
  color: ${winner === "player1"
    ? "#ff69b4"
    : winner === "player2"
    ? "#6495ed"
    : "#fff"};

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
