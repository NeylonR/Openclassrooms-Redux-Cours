export const playPause = () => ({ type: 'playPauseAction'});
export const restart = () => ({ type: 'restart'});
export const playerScore = (player) => ({
  type: "addPlayerScore",
  payload: {player: player}
})