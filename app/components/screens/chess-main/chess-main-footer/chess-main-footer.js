import React, { Component } from 'react';
import Reflux from 'reflux';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { ChessButton } from '../../../shared/chess-button';

import { RoundStateStore } from '../../../../stores/round-state-store';

import { colors } from '../../../colors';

export class ChessMainFooter extends Reflux.Component {

  constructor(){
    super();
    this.store = RoundStateStore;
    this.newGame = this.newGame.bind(this);
  }

  newGame(){
    this.state.game.reset();
  }

  render() {
    return (
      <View style={[this.props.style, styles.buttonContainer]}>
        <View style={styles.buttonRow}>
          <ChessButton onPress={this.newGame}>New Game</ChessButton>
          <ChessButton onPress={this.props.toggleModal}>Game mode</ChessButton>
          <ChessButton>Board layout</ChessButton>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    backgroundColor: colors.active,
    borderWidth: 1,
    borderColor: colors.border,
  }
});
