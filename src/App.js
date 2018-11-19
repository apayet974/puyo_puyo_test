import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { generateNextPuyoPairAction } from './actions/generateNextPuyoPair'
import GameBoard from './components/game-board/GameBoard';
import { Grid } from 'semantic-ui-react';
import GameCommands from './components/game-commands/GameCommands';
import NextPairView from './components/next-pair-view/NextPairView';
import GameInfo from './components/game-info/GameInfo';
import { LEVEL_CHANGE_PERIOD } from './constants';
import { incrementLevelAction } from './actions/incrementLevel';

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  generateNextPuyoPair: () => dispatch(generateNextPuyoPairAction()),
  incrementLevel: () => dispatch(incrementLevelAction()),

})

class App extends Component {


  componentDidMount() {
    this.props.generateNextPuyoPair();

    setInterval(this.props.incrementLevel,LEVEL_CHANGE_PERIOD);

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          Puyo Puyo Test
        </header>
        <Grid columns='equal' divided>
            <Grid.Column>
             <GameCommands/>
            </Grid.Column>
            <Grid.Column width={8}>
              <GameBoard />

            </Grid.Column>
            <Grid.Column>
              <NextPairView/>
              <GameInfo/>

            </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
