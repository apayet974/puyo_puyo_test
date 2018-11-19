export const ROTATE_PUYO_ACTION = 'ROTATE_PUYO_ACTION';
export const rotatePuyoAction = (orientation) => dispatch => {
    dispatch({
        type: ROTATE_PUYO_ACTION,
        orientation
    })
};