import { css } from "@emotion/react";
import Square from "./Square";
import { PlayerType } from "./type";

interface BoardProps {
  squares: Array<PlayerType>;
  handleClick: (index: number) => void;
}

function Board({ squares, handleClick }: BoardProps) {
  return (
    <div className="board" css={boardStyle}>
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
    </div>
  );
}

const boardStyle = css`
  margin-top: 15px;
  .board-row {
    display: flex;
    flex-direction: row;
  }
`;

export default Board;
