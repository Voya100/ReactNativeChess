import React from 'react';
import Reflux from 'reflux';
import { StyleSheet, View } from 'react-native';
import i18n from 'react-native-i18n';

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
          <ChessButton onPress={this.newGame}>{i18n.t('game.newGame')}</ChessButton>
          <ChessButton onPress={this.props.toggleModal}>{i18n.t('game.gameMode.title')}</ChessButton>
          
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
