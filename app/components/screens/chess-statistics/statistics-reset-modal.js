import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../shared/chess-button';
import { ChessHeader } from '../../shared/chess-header';
import { CenteredModal } from '../../shared/centered-modal';

export class StatisticsResetModal extends Component {

  render() {
    return (
      <CenteredModal onRequestClose={this.props.onRequestClose} visible={this.props.visible} style={this.props.style}>
        <ChessHeader headerType={2} style={styles.text}>{i18n.t('statistics.resetWarning')}</ChessHeader>
        <ChessButton style={styles.button} onPress={this.props.eraseStatistics}>{i18n.t('statistics.resetConfirmation')}</ChessButton>
        <ChessButton style={styles.button} onPress={this.props.onRequestClose}>{i18n.t('statistics.resetDenial')}</ChessButton>
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
