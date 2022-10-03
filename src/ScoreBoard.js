import Display from "./Display"
import PlayPauseButton from "./PlayPauseButton"
import AddScoreButton from "./AddScoreButton"
import RestartButton from "./RestartButton"
export default function ScoreBoard() {
    return ( 
        <div>
            <Display />
            <div className="buttons">
                <div className="buttons-row">
                    <AddScoreButton playerNumber={1} />
                    <AddScoreButton playerNumber={2} />
                </div>
                <div className="buttons-row">
                    <RestartButton />
                    <PlayPauseButton />
                </div>
            </div>
        </div>
    )
}