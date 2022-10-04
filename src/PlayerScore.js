import { useSelector } from "react-redux";
import { selectPlayerHasAdvantage, selectPlayerScore } from "./selectors";

export default function PlayerScore({ playerId, playerName }) {
    const score = useSelector(selectPlayerScore(playerId));
    const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));
    return (
        <div className="player-score">
            <p>{playerName} : </p>
            <p>{hasAdvantage ? "Advantage - " : ""} {score}</p>
        </div>
    );
}