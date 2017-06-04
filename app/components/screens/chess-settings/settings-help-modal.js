import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../shared/chess-button';
import { ChessHeader } from '../../shared/chess-header';
import { ChessText } from '../../shared/chess-text';
import { CenteredModal } from '../../shared/centered-modal';

export class SettingsHelpModal extends Component {

  render() {
    return (
      <CenteredModal onRequestClose={this.props.onRequestClose} visible={this.props.visible} style={this.props.style}>
        <ChessHeader style={styles.text}>{i18n.t('settings.title')}</ChessHeader>

        <ChessHeader headerType={2}>{i18n.t('settings.language')}</ChessHeader>
        <ChessText>{i18n.t('settings.languageHelp')}{'\n'}</ChessText>

        <ChessHeader headerType={2}>{i18n.t('settings.gameSpeed')}</ChessHeader>
        <ChessText>{i18n.t('settings.gameSpeedHelp')}{'\n'}</ChessText>

        <ChessHeader headerType={2}>{i18n.t('settings.maxRounds')}</ChessHeader>
        <ChessText>{i18n.t('settings.maxRoundsHelp')}{'\n'}</ChessText>
        
        <ChessHeader headerType={2}>{i18n.t('settings.reverseBoard')}</ChessHeader>
        <ChessText>{i18n.t('settings.reverseBoardHelp')}{'\n'}</ChessText>

        <ChessHeader headerType={2}>{i18n.t('settings.customBoard.title')}</ChessHeader>
        <ChessText>{i18n.t('settings.customBoardHelp')}{'\n'}</ChessText>

        <ChessButton style={styles.button} onPress={this.props.onRequestClose}>{i18n.t('settings.close')}</ChessButton>
      </CenteredModal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  button: {
    flex: 0
  }
});
