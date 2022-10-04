export const selectPlayerHasAdvantage = (playerId) => {
    return state => state.advantage === playerId;
}

export const playerNumberOfWin = (playerId) => {
    return state => state.history.filter(match => match.winner === playerId).length;
}

export const selectPlayerScore = (playerId) => {
    return state => state[playerId];
};