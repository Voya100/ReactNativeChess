import React from 'react';
import Reflux from 'reflux';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../../shared/chess-button';

export class ChessMainFooter extends Reflux.Component {

  render() {
    return (
      <View style={[this.props.style, styles.buttonContainer]}>
        <View style={styles.buttonRow}>
          <ChessButton onPress={this.props.startNewGame}>{i18n.t('game.newGame')}</ChessButton>
          <ChessButton onPress={this.props.showModeModal}>{i18n.t('game.gameMode.title')}</ChessButton>
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
  }
});
