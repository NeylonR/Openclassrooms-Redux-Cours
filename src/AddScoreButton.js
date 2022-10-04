import { useDispatch } from "react-redux";
import { playerScore } from "./actions"
export default function AddScoreButton({playerId}) {
    const dispatch = useDispatch();
    const player = playerId;
    
    return <button className='button' onClick={() => {
        dispatch(playerScore(player))
    }}>{player === "player1" ? "Player 1 point" : "Player 2 point"}</button>
  }