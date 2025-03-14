import { PlayerType } from "./type";

export interface CalculateWinnerReturn {
  winner: PlayerType | "draw" | null;
}

export function calculateWinner(
  board: Array<PlayerType>
): CalculateWinnerReturn {
  const flatBoard = board.flat();

  const winnerLines = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  for (const [a, b, c] of winnerLines) {
    if (
      flatBoard[a] &&
      flatBoard[a] === flatBoard[b] &&
      flatBoard[a] === flatBoard[c]
    ) {
      return { winner: flatBoard[a] };
    }
  }

  if (flatBoard.every((cell) => cell)) return { winner: "draw" };
  return { winner: null };
}
