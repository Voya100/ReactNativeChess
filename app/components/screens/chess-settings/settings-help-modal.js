import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../shared/chess-button';
import { ChessHeader } from '../../shared/chess-header';
import { ChessText } from '../../shared/chess-text';
import { CenteredModal } from '../../shared/centered-modal';

// Shows more detailed descriptions of the settings

export const SettingsHelpModal = ({style, visible, onRequestClose}) => (
  <CenteredModal onRequestClose={onRequestClose} visible={visible} style={style}>
    <ChessHeader style={styles.text}>{i18n.t('settings.title')}</ChessHeader>

    <ScrollView style={{margin:5}}>
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
    </ScrollView>

    <ChessButton style={styles.button} onPress={onRequestClose}>{i18n.t('settings.close')}</ChessButton>
  </CenteredModal>
);

SettingsHelpModal.propTypes = {
  style: CenteredModal.propTypes.style,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

SettingsHelpModal.defaultProps = {
  style: undefined
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  button: {
    flex: 0
  }
});
