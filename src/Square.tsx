import { css } from "@emotion/react";
import { PlayerType } from "./type";

interface SquareProps {
  value: PlayerType;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  const displayValue: Record<PlayerType, string> = {
    "": "",
    player1: "X",
    player2: "O",
  };

  return (
    <button css={squareStyle} onClick={onSquareClick}>
      {displayValue[value]}
    </button>
  );
}

const squareStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  height: 4rem;
  width: 4rem;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #999;
  margin: 3px;
  cursor: pointer;

  &:hover {
    background-color: #646cff;
  }
  &:active {
    background-color: #646cff;
  }
`;

export default Square;
