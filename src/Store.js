import { createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import produce from "immer";

const initialState = {
  player1Score: 0,
  player2Score: 0,
  advantage: null,
  winner: null,
  playing: true,
  history: []
}

function reducer(state = initialState, action) {
  if(state.winner && action.type !== "restart"){
    return state;
  }

  if(action.type === "playPauseAction") {
    const nextState = produce(state, draft => {
      draft.playing = !draft.playing;
    })
    return nextState;
  }
  
  if(action.type === "addPlayerScore") {
    const player = action.payload.player;
    const otherPlayer = player === "player1Score" ? "player2Score" : "player1Score";
    const currentPlayerScore = state[player];
    
    if(state.playing === false){
      return state;
    }
    if(currentPlayerScore <= 15){
      const nextState = produce(state, draft => {
        draft[player] = currentPlayerScore + 15;
      })
      return nextState;
    }
    if(currentPlayerScore === 30){
      const nextState = produce(state, draft => {
        draft[player] = currentPlayerScore + 10;
      })
      return nextState;
    }
    if(currentPlayerScore === 40){
      if(state[otherPlayer] !== 40 || state.advantage === player){
        const nextState = produce(state, draft => {
          draft.winner = player;
        })
        return nextState;
      }
      const nextState = produce(state, draft => {
        draft.advantage = player;
      })
      return nextState;
    }
  }
  
  if(action.type === "restart"){
    const nextState = produce(state, draft => {
      if(state.winner) {
        const player = draft.winner;
        const playerString = draft.winner === "player1Score" ? "Player 1 " : "Player 2 ";
        const otherPlayer = draft.winner === "player1Score" ? "player2Score" : "player1Score";
        draft.history.push(`${playerString} won ${draft[player]} - ${draft[otherPlayer]}`);
      }
      draft.player1Score = 0;
      draft.player2Score = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = true;
    })
    return nextState;
  }
  
  return state;
};

export const store = createStore(reducer);

// store.subscribe(() => {
//   console.log("Nouveau state:");
//   console.log(store.getState());
// });