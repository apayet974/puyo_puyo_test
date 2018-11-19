import Utils from "../services/Utils";


export const GENERATE_NEXT_PUYO_PAIR_ACTION = 'GENERATE_NEXT_PUYO_PAIR_ACTION';
export const generateNextPuyoPairAction = () => dispatch => {
    dispatch({
        type: GENERATE_NEXT_PUYO_PAIR_ACTION,
        nextPuyoPair: Utils.generateRandomPuyoPair()
    })
};