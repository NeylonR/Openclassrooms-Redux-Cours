import { createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import produce from "immer";

const initialState = {
  player1: 0,
  player2: 0,
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
    const otherPlayer = player === "player1" ? "player2" : "player1";
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

      if(state.advantage === otherPlayer){
        const nextState = produce(state, draft => {
          draft.advantage = null;
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
        const otherPlayer = draft.winner === "player1" ? "player2" : "player1";
        draft.history.push({
          player1: draft[player],
          player2: draft[otherPlayer],
          winner: player
        })
      }
      draft.player1 = 0;
      draft.player2 = 0;
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