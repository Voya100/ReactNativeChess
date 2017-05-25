import React, { Component } from 'react';
import Reflux from 'reflux';
import { StyleSheet,  View } from 'react-native';

import { ChessHeader } from './components/chess-header/chess-header';
import { ChessMain } from './components/chess-main/chess-main';
import { ChessFooter } from './components/chess-footer/chess-footer';

import { ChessGame } from './game/chess-game';
import { ChessSettings } from './game/chess-settings';

import { PieceStore } from './stores/piece-store';
import { BoardStore } from './stores/board-store';
import { RoundStateStore } from './stores/round-state-store';

import { colors } from './components/colors';

export default class ReactNativeChess extends Component {

  constructor(){
    super();
    Reflux.initStore(PieceStore);
    Reflux.initStore(BoardStore);
    Reflux.initStore(RoundStateStore);
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
    backgroundColor: colors.background,
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