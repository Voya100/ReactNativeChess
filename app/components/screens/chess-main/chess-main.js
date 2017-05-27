import React from 'react';
import Reflux from 'reflux';
import { StyleSheet, View, Dimensions } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessBoard } from './chess-board/chess-board';
import { ChessMainHeader } from './chess-main-header/chess-main-header';
import { ChessMainFooter } from './chess-main-footer/chess-main-footer';
import { ChooseModeModal } from './choose-mode-modal/choose-mode-modal';
import { VictoryModal } from './victory-modal/victory-modal';

import { RoundStateStore } from '../../../stores/round-state-store';

const border = 2;
const margin = 2;

export class ChessMain extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('game.title'),
  };

  constructor(){
    super();
    this.state = {chooseModeVisible: false, victoryVisible: false};
    this.store = RoundStateStore;
    this.storeKeys = ['winner', 'gameHasEnded', 'game'];

    this.openChooseModeModal = this.openChooseModeModal.bind(this);
    this.closeChooseModeModal = this.closeChooseModeModal.bind(this);
    this.openVictoryModal = this.openVictoryModal.bind(this);
    this.closeVictoryModal = this.closeVictoryModal.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  // Victory modal will be opened once when game has ended
  componentDidUpdate(prevProps, prevState){
    if(prevState.gameHasEnded !== this.state.gameHasEnded && this.state.gameHasEnded){
      this.openVictoryModal();
    }
  }

  openChooseModeModal(){
    this.setState({chooseModeVisible: true, victoryVisible: false})
  }

  closeChooseModeModal(){
    this.setState({chooseModeVisible: false})
  }

  openVictoryModal(){
    console.log("open victory")
    this.setState({victoryVisible: true, chooseModeVisible: false});
  }

  closeVictoryModal(){
    this.setState({victoryVisible: false});
  }

  newGame(){
    this.state.game.reset();
    this.setState({victoryVisible: false, chooseModeVisible: false})
  }

  render() {
    let {width, height} = Dimensions.get('window');
    let fullBoardSize = width - 2*margin;
    let boardSize = fullBoardSize - 2*border;
    let tileSize = boardSize / 8;
    let boardStyle = {
      width: fullBoardSize,
      height: fullBoardSize,
      borderWidth: border
    }
    // Makes modal more centered to the board
    let modalPosition = {
      marginTop: (height - fullBoardSize) / 4 + 20
    }
    return (
      <View style={[styles.main]}>
        <ChessMainHeader/>
        <ChessBoard tileSize={tileSize} style={boardStyle}/>
        <ChessMainFooter style={styles.footer} startNewGame={this.newGame} showModeModal={this.openChooseModeModal}/>

        <ChooseModeModal 
          visible={this.state.chooseModeVisible && !this.state.victoryVisible} 
          onRequestClose={this.closeChooseModeModal} 
          startNewGame={this.newGame}
          style={modalPosition}
        />
        <VictoryModal 
          visible={this.state.victoryVisible} 
          onRequestClose={this.closeVictoryModal} 
          startNewGame={this.newGame}
          openChooseModeModal={this.openChooseModeModal}
          winner={this.state.winner} 
          style={modalPosition}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    margin: margin,
    justifyContent: 'space-around',
    flex: 1
  }
});