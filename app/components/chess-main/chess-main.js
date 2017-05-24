import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ChessBoard } from './chess-board/chess-board'

const border = 3;
const margin = 2;

export class ChessMain extends Component {
  render() {
    let fullBoardSize = Dimensions.get('window').width - 2*margin;
    let boardSize = fullBoardSize - 2*border;
    let tileSize = boardSize / 8;

    let mainStyle = {
      width: fullBoardSize,
      height: fullBoardSize
    }

    return (
      <View style={[styles.main, mainStyle]}>
          <ChessBoard game={this.props.game} tiles={this.props.tiles} pieces={this.props.pieces} tileSize={tileSize}></ChessBoard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    borderWidth: border,
    margin: margin,
    position: 'relative'
  }
});