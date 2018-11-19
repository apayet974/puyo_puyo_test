export const ADD_PUYO_PAIR_TO_GRID = 'ADD_PUYO_PAIR_TO_GRID';
export const addPuyoPairToGridAction = (puyoPair, columnIndex) => dispatch => {
    dispatch({
        type: ADD_PUYO_PAIR_TO_GRID,
        puyoPair,
        columnIndex
    })
};