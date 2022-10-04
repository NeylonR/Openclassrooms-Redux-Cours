import Display from "./Display"
import PlayPauseButton from "./PlayPauseButton"
import AddScoreButton from "./AddScoreButton"
import RestartButton from "./RestartButton"
import PlayerScore from "./PlayerScore"
import PlayerPoints from "./PlayerPoints"
export default function ScoreBoard() {
    return ( 
        <div>
            <PlayerPoints playerId={"player1"} playerName={"Player 1"} />
            <PlayerPoints playerId={"player2"} playerName={"Player 2"} />
            <Display />
            <PlayerScore playerId={"player1"} playerName={"Player 1"} />
            <PlayerScore playerId={"player2"} playerName={"Player 2"} />
            <div className="buttons">
                <div className="buttons-row">
                    <AddScoreButton playerId={"player1"} />
                    <AddScoreButton playerId={"player2"} />
                </div>

                <div className="buttons-row">
                    <RestartButton />
                    <PlayPauseButton />
                </div>
            </div>
        </div>
    )
}