import { useStore } from "react-redux";
import { autoplay } from "./actions"
export default function PlayPauseButton() {
    const store = useStore();
   
    return <button className='button' onClick={() => {
      autoplay(store)
    }} >Pause / Play</button>
  }