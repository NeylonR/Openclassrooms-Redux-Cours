// import { createStore } from "https://cdn.skypack.dev/redux@4.0.5";
// exo consignes ( fait sur codepen, copié ici pour la forme) :
// créer le state initial de l’application ;
// imaginer les actions et créer les action creators ;
// créer un reducer pour implémenter la logique de l’application ;
// importer Redux et créer le store ;
// appeler la fonction dispatch  au clic sur les boutons ;
// utiliser la fonction subscribe  pour automatiquement mettre à jour l’affichage quand le state change.

// on trouve les éléments dans le document HTML
const score = document.getElementById("score");
const player1Button = document.getElementById("player-1");
const player2Button = document.getElementById("player-2");
const resetButton = document.getElementById("reset");
const pauseButton = document.getElementById("pause");
const initialState = {
  player1Score: 0,
  player2Score: 0,
  advantage: null,
  winner: null,
  playing: true
}

// on crée le store avec le state et le reducer
const store = Redux.createStore(reducer, initialState);

store.subscribe(() => {
  const state = store.getState();
  updateScoreText({...state});
})

function reducer(state, action) {
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
  
  if(action.type === "reset"){
    return initialState ;
  }
  
  return state;
};

const playPause = () => ({ type: 'playPauseAction'});
const resetScore = () => ({ type: 'reset'});
const playerScore = (player) => ({
  type: "addPlayerScore",
  payload: {player: player}
})

player1Button.addEventListener("click", () => {
  // Ce code s'exécute lorsque le bouton "Point Joueur 1" est cliqué
  store.dispatch(playerScore('player1Score'))
});

player2Button.addEventListener("click", () => {
  // Ce code s'exécute lorsque le bouton "Point Joueur 2" est cliqué
  store.dispatch(playerScore('player2Score'))
});
 
resetButton.addEventListener("click", () => {
  // Ce code s'exécute lorsque le bouton "Remettre à zéro" est cliqué
  store.dispatch(resetScore())
});

pauseButton.addEventListener("click", function () {
  // Ce code s'exécute lorsque le bouton "Pause / Reprendre" est cliqué
  store.dispatch(playPause())
});

/**
 * Met à jour le text qui affiche le score
 * @param {boolean} playing
 * @param {'player1' | 'player2'} winner
 * @param {number} player1Score
 * @param {number} player2Score
 * @param {'player1' | 'player2'} advantage
 */
function updateScoreText({...state}) {
  if (state.winner) {
    if (state.winner === "player1Score") {
      score.innerHTML = "Joueur 1 gagne";
    } else {
      score.innerHTML = "Joueur 2 gagne";
    }
  } else if (state.playing === false) {
    score.innerHTML = "C'est la pause";
  } else {
    let text = "Le score est: " + state.player1Score + " - " + state.player2Score;
    if (state.advantage) {
      if (state.advantage === "player1Score") {
        text += " avantage joueur 1";
      } else {
        text += " avantage joueur 2";
      }
    }
    score.innerHTML = text;
  }
}