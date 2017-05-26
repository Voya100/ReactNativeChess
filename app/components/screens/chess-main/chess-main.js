import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import i18n from 'react-native-i18n'

import { ChessBoard } from './chess-board/chess-board';
import { ChessMainHeader } from './chess-main-header/chess-main-header';
import { ChessMainFooter } from './chess-main-footer/chess-main-footer';
import { ChooseModeModal } from './choose-mode-modal/choose-mode-modal';

const border = 2;
const margin = 2;

export class ChessMain extends Component {
  static navigationOptions = {
      title: i18n.t('game.title'),
  };

  constructor(){
    super();
    this.state = {chooseModeVisible: false}
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({chooseModeVisible: !this.state.chooseModeVisible});
  }

  render() {
    let fullBoardSize = Dimensions.get('window').width - 2*margin;
    let boardSize = fullBoardSize - 2*border;
    let tileSize = boardSize / 8;
    let boardStyle = {
      width: fullBoardSize,
      height: fullBoardSize,
      borderWidth: border
    }

    return (
      <View style={[styles.main]}>
        <ChessMainHeader/>
        <ChessBoard tileSize={tileSize} style={boardStyle}/>
        <ChessMainFooter style={styles.footer} toggleModal={this.toggleModal}/>
        <ChooseModeModal visible={this.state.chooseModeVisible} onRequestClose={this.toggleModal}/>
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