import React, { Component } from 'react';
import { StyleSheet,  View } from 'react-native';

import { ChessHeader } from './components/chess-header/chess-header';
import { ChessMain } from './components/chess-main/chess-main';
import { ChessFooter } from './components/chess-footer/chess-footer';

import { ChessGame } from './game/chess-game';
import { ChessSettings } from './game/chess-settings';

export default class ReactNativeChess extends Component {

  constructor(){
    super();
    this.settings = new ChessSettings();
    this.game = new ChessGame(this.settings);
    this.game.reset();
  }

  render() {

    return (
      <View style={[styles.container]}>
        <ChessHeader style={styles.header}></ChessHeader>
        <ChessMain game={this.game} tiles={this.game.board} pieces={[...this.game.white.pieces, ...this.game.black.pieces]}></ChessMain>
        <ChessFooter style={styles.footer}></ChessFooter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6cfaf',
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  }
});