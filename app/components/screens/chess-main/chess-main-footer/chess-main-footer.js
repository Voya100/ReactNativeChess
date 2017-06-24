import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../../shared/chess-button';

export const ChessMainFooter = ({style, startNewGame, showModeModal}) =>  (
  <View style={[style, styles.buttonContainer]}>
    <View style={styles.buttonRow}>
      <ChessButton onPress={startNewGame}>{i18n.t('game.newGame')}</ChessButton>
      <ChessButton onPress={showModeModal}>{i18n.t('game.gameMode.title')}</ChessButton>
    </View>
  </View>
);

ChessMainFooter.propTypes = {
  style: View.propTypes.style,
  startNewGame: PropTypes.func.isRequired,
  showModeModal: PropTypes.func.isRequired
}

ChessMainFooter.defaultProps = {
  style: undefined
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
