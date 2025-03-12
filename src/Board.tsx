import { css } from "@emotion/react";
import Square from "./Square";
import { useState } from "react";
import { PlayerType } from "./type";

// TODO: 왜 null값이 들어갔는데 에러가 없지?
function Board() {
  const [squares, setSquares] = useState<Array<PlayerType>>(
    Array(9).fill("empty")
  );

  const handleClick = (index: number) => {
    const nextSquares = squares.slice();
    nextSquares[index] = "player1";
    setSquares(nextSquares);
  };
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
