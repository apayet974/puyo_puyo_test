import React, { Component } from 'react';
import './GameBoard.css'
import Puyo from '../puyo/Puyo';
import { GRID_CELL_SIZE, EMPTY_CELL, PHASE_PLAYING, CMD_MOVE_LEFT, CMD_MOVE_RIGHT, GRID_MAX_WIDTH, GRID_MIN_WIDTH, CMD_INSTANT_DROP, PHASE_DROPPING, DROP_VELOCITY, CMD_ROTATION_UP, ROTATION_UP, CMD_ROTATION_BACK, ROTATION_BACK, POSITION_TOP, POSITION_BOTTOM, PHASE_COMPUTING, PHASE_GAME_OVER, GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT, GAME_BOARD_GAME_OVER_BG, GAME_BOARD_PLAY_BG, DEFAULT_VELOCITY, PIXEL_BY_INTERVAL, COLUMN_NUMBERS, GRID_MAX_HEIGHT } from '../../constants';
import { connect } from 'react-redux';
import PuyoPair from '../puyo-pair/PuyoPair';
import { timer } from 'rxjs';
import { incrementLevelAction } from '../../actions/incrementLevel';
import { changePhaseAction } from '../../actions/changePhase';
import { addPuyoPairToGridAction } from '../../actions/addPuyoPairToGrid';
import { generateNextPuyoPairAction } from '../../actions/generateNextPuyoPair';
import { rotatePuyoAction } from '../../actions/rotatePuyo';
import Utils from '../../services/Utils';

const mapStateToProps = state => ({
    gameGrid: state.gameReducer.gameGrid,
    currentPuyoPair: state.gameReducer.currentPuyoPair,
    gamePhase: state.gameReducer.gamePhase,
    level: state.gameReducer.level
});

const mapDispatchToProps = dispatch => ({
    changePhase: (newPhase) => dispatch(changePhaseAction(newPhase)),
    generateNextPuyoPair: () => dispatch(generateNextPuyoPairAction()),
    addPuyoPairToGrid: (puyoPair, columnIndex) => dispatch(addPuyoPairToGridAction(puyoPair, columnIndex)),
    rotatePuyoPair: (orientation) => dispatch(rotatePuyoAction(orientation))
});

class GameBoard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // the index is based on the A puyo of the pair
            currentPuyoPairColumnIndex: 2,
            currentPuyoPairY: 0
        };
        this.updateCurrentPuyoPairY = this.updateCurrentPuyoPairY.bind(this);
        this.updateCurrentPuyoColumn = this.updateCurrentPuyoColumn.bind(this);
        this.triggerDrop = this.triggerDrop.bind(this);
        this.getCurrentVelocity = this.getCurrentVelocity.bind(this);
        this.resetCurrentPuyoPair = this.resetCurrentPuyoPair.bind(this);

    }

    componentDidMount() {
        document.addEventListener('keypress', (event) => {
            const { gamePhase, rotatePuyoPair } = this.props;
            if (gamePhase === PHASE_PLAYING) {
                switch (event.code) {
                    case CMD_MOVE_LEFT:
                        this.updateCurrentPuyoColumn(-1);
                        break;
                    case CMD_MOVE_RIGHT:
                        this.updateCurrentPuyoColumn(1);
                        break;
                    case CMD_INSTANT_DROP:
                        this.triggerDrop();
                        break;
                    case CMD_ROTATION_UP:
                        rotatePuyoPair(ROTATION_UP);
                        break;
                    case CMD_ROTATION_BACK:
                        rotatePuyoPair(ROTATION_BACK);
                        break;
                    default:
                        break;


                }
            }

        });

        const velocityLoop = () => setTimeout(() => { this.updateCurrentPuyoPairY(); velocityLoop(); }, this.getCurrentVelocity());

        velocityLoop();


    }

    triggerDrop() {
        const { addPuyoPairToGrid, currentPuyoPair, generateNextPuyoPair, changePhase } = this.props;
        const { currentPuyoPairColumnIndex } = this.state;
        //this.props.changePhase(PHASE_DROPPING);
        addPuyoPairToGrid(currentPuyoPair, currentPuyoPairColumnIndex);
        changePhase(PHASE_COMPUTING);
        generateNextPuyoPair();
        this.resetCurrentPuyoPair();


    }

    getCurrentVelocity() {
        const { level, gamePhase } = this.props;
        switch (gamePhase) {

            case PHASE_PLAYING: return 10//DEFAULT_VELOCITY - (DEFAULT_VELOCITY/(2*level));
            case PHASE_DROPPING: return parseInt(DROP_VELOCITY, 10);
            default: return 0;
        }
    }

    updateCurrentPuyoColumn(positionDiff) {
        const { currentPuyoPairColumnIndex } = this.state;
        const { currentPuyoPair } = this.props;
        const newColumnPosition = positionDiff + currentPuyoPairColumnIndex;
        const extraColumn = [POSITION_BOTTOM, POSITION_TOP].includes(currentPuyoPair.position) ? 1 : 0;
        if (newColumnPosition < (GRID_MAX_WIDTH + extraColumn) && newColumnPosition >= GRID_MIN_WIDTH) {
            this.setState({ currentPuyoPairColumnIndex: newColumnPosition });
        }
    }

    resetCurrentPuyoPair() {
        this.setState({ currentPuyoPairY: 0, currentPuyoPairColumnIndex: Math.floor(Math.random()* (COLUMN_NUMBERS-1)) });

    }

    updateCurrentPuyoPairY() {
        const {currentPuyoPairY, currentPuyoPairColumnIndex} = this.state;
        const {gameGrid,currentPuyoPair} = this.props;

        const newCurrentPuyoPairY = currentPuyoPairY + parseInt(PIXEL_BY_INTERVAL,10);
        const puyoPairIndexes = Utils.getGameGridIndexesFromPuyoPair(currentPuyoPairY,currentPuyoPairColumnIndex,currentPuyoPair.position);
        const isColliding = puyoPairIndexes.reduce((prev, puyoPairIndex) => {
            return prev 
            || puyoPairIndex.rowIndex > GRID_MAX_HEIGHT
            || gameGrid[puyoPairIndex.rowIndex][puyoPairIndex.colIndex] !== EMPTY_CELL;
        }, false);

        if (isColliding) {
            this.triggerDrop();

        } else {
            this.setState({ currentPuyoPairY: newCurrentPuyoPairY })

        }
    }

    render() {

        const { currentPuyoPair, gameGrid, gamePhase } = this.props;
        const { currentPuyoPairColumnIndex, currentPuyoPairY } = this.state;
        return (
            <div className="component-GameBoard">
                <svg style={{ width: GAME_BOARD_WIDTH, height: GAME_BOARD_HEIGHT, backgroundColor: gamePhase === PHASE_GAME_OVER ? GAME_BOARD_GAME_OVER_BG : GAME_BOARD_PLAY_BG }}>
                    {gameGrid.map((row, rowIndex) => {
                        return row.map((puyoColor, columnIndex) => {
                            return <g key={`${columnIndex}x${rowIndex}`}>{puyoColor !== EMPTY_CELL && <Puyo cx={GRID_CELL_SIZE * (columnIndex + 0.5)}
                                cy={GRID_CELL_SIZE * (rowIndex + 0.5)}
                                color={puyoColor} />}</g>
                        })
                    })}
                    {currentPuyoPair &&
                        <PuyoPair x={GRID_CELL_SIZE * currentPuyoPairColumnIndex}
                            y={currentPuyoPairY}
                            {...currentPuyoPair} />}
                </svg>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
