import React, { Component } from 'react';
import './PuyoPair.css'
import Puyo from '../puyo/Puyo';
import { GRID_CELL_SIZE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT } from '../../constants';
export default class PuyoPair extends Component {
    render() {
        const { x, y, puyoAColor, puyoBColor, position } = this.props;
        // The position reflects the relative postion of B regarding to A
        const getCoordinatesFromPosition = (postion) => {
            const cellSize = parseInt(GRID_CELL_SIZE,10);
            const simpleSize = cellSize;
            const doubleSize = cellSize * 2;
            const firstCenter = cellSize / 2;
            const secondCenter = cellSize + firstCenter;

            switch (position) {
                case POSITION_TOP: return { cxA: firstCenter, cyA: secondCenter, cxB: firstCenter, cyB: firstCenter, width: simpleSize, height: doubleSize };
                case POSITION_RIGHT: return { cxA: firstCenter, cyA: firstCenter, cxB: secondCenter, cyB: firstCenter, width: doubleSize, height: simpleSize };
                case POSITION_BOTTOM: return { cxA: firstCenter, cyA: firstCenter, cxB: firstCenter, cyB: secondCenter, width: simpleSize, height: doubleSize };
                case POSITION_LEFT: return { cxA: secondCenter, cyA: firstCenter, cxB: firstCenter, cyB: firstCenter, width: doubleSize, height: simpleSize };
            }
        }
        const { cxA, cyA, cxB, cyB, width, height } = getCoordinatesFromPosition(position);


        return (
            <svg x={x} y={y} width={width} height={height}>
                <Puyo cx={cxA} cy={cyA} color={puyoAColor} />
                <Puyo cx={cxB} cy={cyB} color={puyoBColor} />
            </svg>

        )
    }
}
