import React, { Component } from 'react';
import './NextPairView.css'
import { connect } from 'react-redux';
import PuyoPair from '../puyo-pair/PuyoPair';
import { GAME_BOARD_PLAY_BG, GAME_BOARD_CELL_LENGTH } from '../../constants';
import { Segment } from 'semantic-ui-react';

const mapStateToProps = state => ({
    nextPuyoPair: state.gameReducer.nextPuyoPair
});

class NextPairView extends Component {
    render() {
        const { nextPuyoPair } = this.props;
        return (
            <Segment className="component-NextPairView">
                <h2>Next Pair :</h2>
                <svg width={GAME_BOARD_CELL_LENGTH* 2} height={GAME_BOARD_CELL_LENGTH } style={{ backgroundColor: GAME_BOARD_PLAY_BG }}>
                    {nextPuyoPair && <PuyoPair x={0} y={0} {...nextPuyoPair} />}
                </svg>
            </Segment>
        )
    }
}

export default connect(mapStateToProps)(NextPairView);