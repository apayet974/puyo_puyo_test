import { PHASE_COMPUTING } from "../constants";
import { COMPUTE_GRID_CHAINS } from "./computeGridChains";

export const CHANGE_PHASE = 'CHANGE_PHASE';

export const changePhaseAction = (newPhase) => dispatch => {
    
    dispatch({
        type: CHANGE_PHASE,
        newPhase
    });
    if (newPhase === PHASE_COMPUTING) {
        dispatch({
            type: COMPUTE_GRID_CHAINS
        });
    }
};