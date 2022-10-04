export const setPlaying = (playing) => ({ 
  type: 'setPlaying', 
  payload: playing
});

export const restart = () => ({ type: 'restart'});

export const playerScore = (player) => ({
  type: "addPlayerScore",
  payload: {player: player}
})

export const autoplay = (store) => {
  const isPlaying = store.getState().playing;
  if(isPlaying) return;
  store.dispatch(setPlaying(true));
  window.setTimeout(() => {
    if(store.getState().playing === false) return;
    const pointWinner = Math.random() > 0.5 ? "player1" : "player2";
    store.dispatch(playerScore(pointWinner));
    store.dispatch(setPlaying(false));
  }, 2000);
};