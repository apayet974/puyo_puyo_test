import Utils from "../services/Utils";
import { GENERATE_NEXT_PUYO_PAIR_ACTION } from "../actions/generateNextPuyoPair";
import { EMPTY_CELL, PHASE_PLAYING, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT, GRID_MAX_WIDTH, GRID_MAX_HEIGHT, ROW_NUMBERS, GRID_MIN_HEIGHT, ROTATION_UP, ROTATION_BACK, PUYO_COLORS_LIST, COLUMN_NUMBERS, MIN_CHAIN_LENGTH, PHASE_DROPPING, PHASE_GAME_OVER, PHASE_COMPUTING } from "../constants";
import { INCREMENT_LEVEL } from "../actions/incrementLevel";
import { CHANGE_PHASE } from "../actions/changePhase";
import { ADD_PUYO_PAIR_TO_GRID } from "../actions/addPuyoPairToGrid";
import { ROTATE_PUYO_ACTION } from "../actions/rotatePuyo";
import { COMPUTE_GRID_CHAINS } from "../actions/computeGridChains";
import * as _ from 'lodash';
import { dispatch } from "rxjs/internal/observable/pairs";

const addPuyoToGameGrid = (gameGrid, puyoColor, columnIndex) => {

    let foundCell = false;
    // the grid is implemented in reverse so we have to browse it backwards
    for (let i = GRID_MAX_HEIGHT; i >= GRID_MIN_HEIGHT; i--) {
        foundCell = gameGrid[i] && gameGrid[i][columnIndex] && gameGrid[i][columnIndex]=== EMPTY_CELL;
        if (foundCell) {
            gameGrid[i][columnIndex] = puyoColor;
            break;
        }
    }

    // This would mean Game Over
    if (!foundCell) {
        // TODO Not completely finalized
        return {gameGrid, gamePhase: PHASE_GAME_OVER};
    }
    return {gameGrid, gamePhase: PHASE_COMPUTING};
}

const rotatePuyo = (puyoPair, orientation) => {
    let nextPosition;
    switch (orientation) {
        case ROTATION_UP:
            switch (puyoPair.position) {
                case POSITION_TOP: nextPosition = POSITION_LEFT;
                    break;
                case POSITION_LEFT: nextPosition = POSITION_BOTTOM;
                    break;

                case POSITION_BOTTOM: nextPosition = POSITION_RIGHT;
                    break;

                case POSITION_RIGHT: nextPosition = POSITION_TOP;
                    break;

            }
            break;
        case ROTATION_BACK:
            switch (puyoPair.position) {
                case POSITION_TOP: nextPosition = POSITION_RIGHT;
                    break;

                case POSITION_RIGHT: nextPosition = POSITION_BOTTOM;
                    break;

                case POSITION_BOTTOM: nextPosition = POSITION_LEFT;
                    break;

                case POSITION_LEFT: nextPosition = POSITION_TOP;
                    break;

            }
            break;

        default:
            break;

    }
    return { ...puyoPair, position: nextPosition };
}

const computeGridChains = (gameGrid) => {
    let chains = [];

    // Method to find up, right, bottom and left neighbour of cell
    const findNeighbours = (rowIndex, colIndex, color) => {
        const neighbours = [[rowIndex, colIndex]];

        if (gameGrid[rowIndex + 1] && gameGrid[rowIndex + 1][colIndex] === color) {
            neighbours.push([rowIndex + 1, colIndex]);
        }
        if (gameGrid[rowIndex] && gameGrid[rowIndex][colIndex + 1] === color) {
            neighbours.push([rowIndex, colIndex + 1]);
        }
        if (rowIndex > 0 && gameGrid[rowIndex - 1] && gameGrid[rowIndex - 1][colIndex] === color) {
            neighbours.push([rowIndex - 1, colIndex]);
        }
        if (colIndex > 0 && gameGrid[rowIndex] && gameGrid[rowIndex][colIndex - 1] === color) {
            neighbours.push([rowIndex, colIndex - 1]);
        }

        return neighbours;
    }

    // Construct chains of same color
    for (let rowIndex = 0; rowIndex < ROW_NUMBERS; rowIndex++) {
        for (let colIndex = 0; colIndex < COLUMN_NUMBERS; colIndex++) {
            const cellColor = gameGrid[rowIndex][colIndex];
            if (cellColor !== EMPTY_CELL) {
                const neighbours = findNeighbours(rowIndex, colIndex, cellColor);
                if (neighbours.length > 0) {
                    let foundChain = false;
                    chains = chains.map((chain) => {
                        foundChain = _.intersectionWith(chain, neighbours, _.isEqual).length > 0;
                        if (foundChain) {
                            return _.unionWith(chain, neighbours, _.isEqual);
                        }
                        return chain;
                    });
                    if (!foundChain) {
                        chains.push(neighbours);
                    }
                }

            }


        }
    }

    // COMPUTE SCORE
    const scoringChains = chains.filter((chain) => chain.length >= MIN_CHAIN_LENGTH);
    const scoreIncremented = scoringChains.reduce((prev,curr) => prev + curr.length,0);

    // EMPTY GRID FROM CHAINS
    for (let chain of scoringChains) {
        for (let cell of chain) {
            gameGrid[cell[0]][cell[1]] = EMPTY_CELL;
        }
    }

    return { gameGrid, gamePhase: PHASE_PLAYING , scoreIncremented};
};


const defaultState = {
    gameGrid: Array.from({ length: ROW_NUMBERS }, e => Array(COLUMN_NUMBERS).fill(EMPTY_CELL)),
    currentPuyoPair: Utils.generateRandomPuyoPair(),
    nextPuyoPair: Utils.generateRandomPuyoPair(),
    gamePhase: PHASE_PLAYING,
    level: 1,
    score : 0
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GENERATE_NEXT_PUYO_PAIR_ACTION:
            return {
                ...state,
                nextPuyoPair: action.nextPuyoPair,
                currentPuyoPair: state.nextPuyoPair
            }
        case INCREMENT_LEVEL:
            const level = state.level + 1;
            return { ...state, level };
        case CHANGE_PHASE:
            return { ...state, gamePhase: action.newPhase };
        case COMPUTE_GRID_CHAINS:
            const { gameGrid, gamePhase, scoreIncremented } = computeGridChains(state.gameGrid);
            return { ...state, gameGrid, gamePhase , score : state.score + scoreIncremented};
        case ROTATE_PUYO_ACTION:
            return { ...state, currentPuyoPair: rotatePuyo(state.currentPuyoPair, action.orientation) };
        case ADD_PUYO_PAIR_TO_GRID:
            let updatedGameGrid = state.gameGrid;
            const { puyoPair, columnIndex } = action;

            switch (puyoPair.position) {
                case POSITION_TOP:
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoAColor, columnIndex).gameGrid;
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoBColor, columnIndex).gameGrid;
                    break;
                case POSITION_RIGHT:
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoAColor, columnIndex).gameGrid;
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoBColor, columnIndex + 1).gameGrid;
                    break;
                case POSITION_BOTTOM:
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoBColor, columnIndex).gameGrid;
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoAColor, columnIndex).gameGrid;
                    break;
                case POSITION_LEFT:
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoAColor, columnIndex).gameGrid;
                    updatedGameGrid = addPuyoToGameGrid(updatedGameGrid, puyoPair.puyoBColor, columnIndex - 1).gameGrid;
                    break;
                default: break;
            }

            return { ...state, gameGrid: updatedGameGrid }
        default:
            return state
    }
}