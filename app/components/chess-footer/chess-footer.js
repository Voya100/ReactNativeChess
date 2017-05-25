import React, { Component } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { ChessButton } from '../shared/chess-button';

import { colors } from '../colors';

export class ChessFooter extends Component {

  render() {
    return (
      <View style={[this.props.style, styles.buttonContainer]}>
        <View style={styles.buttonRow}>
          <ChessButton>New Game</ChessButton>
          <ChessButton>Game mode</ChessButton>
          <ChessButton>Statistics</ChessButton>
        </View>
        <View style={styles.buttonRow}>
          <ChessButton onPress={() => this.props.onNavigate('Settings') }>Settings</ChessButton>
          <ChessButton>Board layout</ChessButton>
          <ChessButton>Instructions</ChessButton>
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
