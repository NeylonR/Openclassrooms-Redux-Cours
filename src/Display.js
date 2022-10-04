import { useSelector } from "react-redux";

export default function Display() {
  const gameIsPlaying = useSelector((state) => state.playing);
  const player1Score = useSelector((state) => state.player1Score);
  const player2Score = useSelector((state) => state.player2Score);
  const advantage = useSelector((state) => state.advantage);
  const winner = useSelector((state) => state.winner);
  const history = useSelector((state) => state.history)
  const winnerName = winner === "player1Score" ? "Player 1" : "Player 2";

  return (
  <>
  <p className="display">
    {winner !== null ? winnerName : gameIsPlaying ? `${player1Score} - ${player2Score}` : "Game is paused"}
    <br/>
    {winner === null && (
      (advantage === "player1Score" && `Player 1 has advantage`) || (advantage === "player2Score" && `Player 2 has advantage`)
    )}
  </p>
  <div>
    {history.length > 0 && history.map((score, index) => {
      return <p key={score + index}>{score}</p>
    })}
  </div>
  </>
  )
}