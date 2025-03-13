import { css } from "@emotion/react";
import { PlayerType } from "./type";

interface SquareProps {
  value: PlayerType;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  const displayValue: Record<PlayerType, string> = {
    "": "",
    X: "X",
    O: "O",
  };

  return (
    <button css={squareStyle(value)} onClick={onSquareClick}>
      {displayValue[value]}
    </button>
  );
}

const squareStyle = (value: PlayerType) => css`
  font-size: 2.5rem;
  font-weight: bold;
  height: 4rem;
  width: 4rem;
  background-color: #1a1a1a;
  border-radius: 5px;
  border: 1px solid #999;
  margin: 3px;
  cursor: pointer;
  color: ${value === "X" ? "#ff69b4" : "#6495ed"};

  &:hover {
    background-color: #333;
  }
  &:active {
    background-color: #333;
  }
`;

export default Square;
