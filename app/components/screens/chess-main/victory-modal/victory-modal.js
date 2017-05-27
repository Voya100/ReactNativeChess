import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../../shared/chess-button';
import { ChessText } from '../../../shared/chess-text';
import { CenteredModal } from '../../../shared/centered-modal';

export class VictoryModal extends Component {

  render() {
    let winner = this.props.winner;
    let victoryMessage = '';
    if(winner == 'tie'){
      victoryMessage = i18n.t('game.victory.itsATie');
    }else if(winner == 'white' || winner == 'black'){
      victoryMessage = i18n.t('game.victory.' + winner + 'Wins');
    }
    return (
      <CenteredModal onRequestClose={this.props.onRequestClose} visible={this.props.visible} style={this.props.style}>
        <ChessText style={styles.text}>{victoryMessage}</ChessText>
        <ChessButton style={styles.button} onPress={this.props.startNewGame}>{i18n.t('game.newGame')}</ChessButton>
        <ChessButton style={styles.button} onPress={this.props.openChooseModeModal}>{i18n.t('game.victory.changeGameMode')}</ChessButton>
      </CenteredModal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: 'center'
  },
  button: {
    flex: 0,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  }
});
