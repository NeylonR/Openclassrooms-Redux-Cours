import { useSelector } from "react-redux";
import { playerNumberOfWin } from "./selectors";

export default function PlayerPoints({ playerId, playerName }) {
    const playerMatchWon = useSelector(playerNumberOfWin(playerId));

    return (
        <div className="player-games">
            <p>
                {playerMatchWon === 0 
                ? `${playerName} has no win` 
                : playerMatchWon === 1 
                ? `${playerName} won ${playerMatchWon} game` 
                : `${playerName} won ${playerMatchWon} games`} 
            </p>
        </div>
    );
}