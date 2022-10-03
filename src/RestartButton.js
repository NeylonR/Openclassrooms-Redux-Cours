import { useDispatch } from "react-redux";
import { restart } from "./actions"
export default function RestartButton({playerNumber}) {
    const dispatch = useDispatch();
    return <button className='button' onClick={() => {
        dispatch(restart())
    }}>Restart</button>
  }