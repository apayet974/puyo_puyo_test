import React, { Component } from 'react';
import './GameInfo.css';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import * as moment from 'moment';

const mapStateToProps = state => ({
    score: state.gameReducer.score,
    level: state.gameReducer.level
});

 class GameInfo extends Component {

    constructor(props) {
        super(props);
        const startTime = moment()
        this.state = {
            time : startTime,
            startTime 
        }
    }

    componentDidMount() {
        const {startTime} = this.state;
        setInterval(() => this.setState({time : Math.ceil(moment.duration(moment().diff(startTime)).asSeconds())}) ,1000)
    }


    render() {
        const {score,level} = this.props;
        const {time} = this.state;
        console.log()
        return (
            <div className="component-GameInfo">
                <Segment>
                    <h1>Level</h1>
                    <p>{level}</p>
                    <h1>Time</h1>
                    <p>{time.toString()} seconds</p>                    
                    <h1>Score</h1>
                    <p>{score}</p>
                </Segment>
            </div>
        )
    }
}

export default connect(mapStateToProps)(GameInfo);

