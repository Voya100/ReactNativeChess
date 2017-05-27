import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../../shared/chess-button';
import { ChessText } from '../../../shared/chess-text';
import { CenteredModal } from '../../../shared/centered-modal';


import { SettingsActions } from '../../../../stores/settings-store';
import { RoundStateStore } from '../../../../stores/round-state-store';

import { colors } from '../../../colors';

export class ChooseModeModal extends Component {

  constructor(){
    super();
  }

  setMode(mode){
    SettingsActions.setGameMode(mode);
    RoundStateStore.state.game.reset();
    this.props.onRequestClose();
  }

  render() {
    // Touchables close modal when pressed outside of the content area
    return (
      <CenteredModal onRequestClose={this.props.onRequestClose} visible={this.props.visible}>
        <ChessText style={styles.text}>{i18n.t('game.gameMode.title')}</ChessText>
        <ChessButton style={styles.button} onPress={() => this.setMode(0)}>{i18n.t('game.gameMode.playerVsComputer')}</ChessButton>
        <ChessButton style={styles.button} onPress={() => this.setMode(1)}>{i18n.t('game.gameMode.localMultiplayer')}</ChessButton>
        <ChessButton style={styles.button} onPress={() => this.setMode(2)}>{i18n.t('game.gameMode.computerVsComputer')}</ChessButton>
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
