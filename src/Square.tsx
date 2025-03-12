import { css } from "@emotion/react";

function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <button css={squareStyle} onClick={onSquareClick}>
      {value}
    </button>
  );
}

const squareStyle = css`
  font-size: 24px;
  font-weight: bold;
  height: 50px;
  width: 50px;
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
