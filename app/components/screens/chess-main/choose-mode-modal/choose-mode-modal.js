import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../../shared/chess-button';
import { ChessHeader } from '../../../shared/chess-header';
import { CenteredModal } from '../../../shared/centered-modal';


import { SettingsActions } from '../../../../stores/settings-store';


export class ChooseModeModal extends Component {

  setMode(mode){
    SettingsActions.setGameMode(mode);
    this.props.startNewGame();
    this.props.onRequestClose();
  }

  render() {
    return (
      <CenteredModal onRequestClose={this.props.onRequestClose} visible={this.props.visible} style={this.props.style}>
        <ChessHeader style={styles.text}>{i18n.t('game.gameMode.title')}</ChessHeader>
        <ChessButton style={styles.button} onPress={() => this.setMode(0)}>{i18n.t('game.gameMode.playerVsComputer')}</ChessButton>
        <ChessButton style={styles.button} onPress={() => this.setMode(1)}>{i18n.t('game.gameMode.localMultiplayer')}</ChessButton>
        <ChessButton style={styles.button} onPress={() => this.setMode(2)}>{i18n.t('game.gameMode.computerVsComputer')}</ChessButton>
      </CenteredModal>
    );
  }
}


const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  button: {
    flex: 0,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  }
});
