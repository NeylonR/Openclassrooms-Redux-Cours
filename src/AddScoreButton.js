import { useDispatch } from "react-redux";
import { playerScore } from "./actions"
export default function AddScoreButton({playerNumber}) {
    const dispatch = useDispatch();
    const player = `player${playerNumber}Score`;
    
    return <button className='button' onClick={() => {
        dispatch(playerScore(player))
    }}>Player {playerNumber} Point</button>
  }