import React, { Component } from 'react';
import Reflux from 'reflux';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { ChessButton } from '../shared/chess-button';

import { RoundStateStore } from '../../stores/round-state-store';

import { colors } from '../colors';

export class ChessFooter extends Reflux.Component {

  constructor(){
    super();
  }

  render() {
    return (
      <View style={[this.props.style, styles.buttonContainer]}>
        <View style={styles.buttonRow}>
          <ChessButton>New Game</ChessButton>
          <ChessButton>Game mode</ChessButton>
          <ChessButton>Board layout</ChessButton>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.active,
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: colors.border
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1
  }
});
