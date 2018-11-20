import React, { Component } from 'react';
import './Puyo.css'
import { PUYO_RADIUS, PUYO_COLORS_MAPPING } from '../../constants';

export default class Puyo extends Component {
    render() {
        const { color, cx, cy } = this.props;
        return (
            <circle cx={cx} cy={cy} r={PUYO_RADIUS} fill={PUYO_COLORS_MAPPING[color]} />
        )
    }
}
