import { css } from "@emotion/react";
import { PlayerType } from "./type";

interface MoveHistoryProps {
  history: Array<Array<PlayerType>>;
  jumpTo: (index: number) => void;
}
function MoveHistory({ history, jumpTo }: MoveHistoryProps) {
  return (
    <div className="move-history" css={moveHistoryStyle}>
      <ol>
        {history.map((_, index) => (
          <li key={index}>
            <button onClick={() => jumpTo(index)}>Go to move #{index}</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

const moveHistoryStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10rem;
  height: 5rem;
`;

export default MoveHistory;
