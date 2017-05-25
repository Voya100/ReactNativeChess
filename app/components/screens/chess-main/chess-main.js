import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ChessBoard } from './chess-board/chess-board';
import { ChessMainHeader } from './chess-main-header/chess-main-header';
import { ChessMainFooter } from './chess-main-footer/chess-main-footer';


const border = 2;
const margin = 2;

export class ChessMain extends Component {
  static navigationOptions = {
      title: 'Game',
  };

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
        <ChessMainFooter style={styles.footer}/>
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