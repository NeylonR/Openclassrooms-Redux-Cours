import { useSelector } from "react-redux";

export default function Display() {
  const gameIsPlaying = useSelector((state) => state.playing);
  const player1 = useSelector((state) => state.player1);
  const player2 = useSelector((state) => state.player2);
  const advantage = useSelector((state) => state.advantage);
  const winner = useSelector((state) => state.winner);
  const history = useSelector((state) => state.history);
  const winnerName = winner === "player1" ? "Player 1" : "Player 2";

  return (
  <>
  <p className="display">
    {winner !== null ? `${winnerName} win` : gameIsPlaying ? `${player1} - ${player2}` : "Game is paused"}
    <br/>
    {winner === null && (
      (advantage === "player1" && `Player 1 has advantage`) || (advantage === "player2" && `Player 2 has advantage`)
    )}
  </p>
  {/* <div>
    {history.length > 0 && history.map((score, index) => {
      return <p key={score + index}>{score}</p>
    })}
  </div> */}
  </>
  )
}