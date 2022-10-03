import { createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  player1Score: 0,
  player2Score: 0,
  advantage: null,
  winner: null,
  playing: true
}

function reducer(state = initialState, action) {
  if(action.type === "playPauseAction") {
    return {
      ...state,
      playing: !state.playing
    }
  }
  
  if(action.type === "addPlayerScore") {
    const player = action.payload.player;
    const otherPlayer = player === "player1Score" ? "player2Score" : "player1Score";
    const currentPlayerScore = state[player];
    
    if(state.winner || state.playing === false){
      return state;
    }
    if(currentPlayerScore <= 15){
        return {
        ...state,
        [player]: currentPlayerScore+ 15
      }
    }
    if(currentPlayerScore === 30){
        return {
        ...state,
          [player]: currentPlayerScore + 10
      }
    }
    if(currentPlayerScore === 40){
      console.log(player)
      if(state[otherPlayer] !== 40 || state.advantage === player){
        return { 
          ...state,
          winner: player
        }
      }
      return {
        ...state,
        advantage: player
      }
    }
  }
  
  if(action.type === "restart"){
    return initialState ;
  }
  
  return state;
};

export const store = createStore(reducer);