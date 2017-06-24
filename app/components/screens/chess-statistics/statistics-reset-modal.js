import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';

import { ChessButton } from '../../shared/chess-button';
import { ChessHeader } from '../../shared/chess-header';
import { CenteredModal } from '../../shared/centered-modal';

export const StatisticsResetModal = ({style, visible, eraseStatistics, onRequestClose}) => (
  <CenteredModal onRequestClose={onRequestClose} visible={visible} style={style}>
    <ChessHeader headerType={2} style={styles.text}>{i18n.t('statistics.resetWarning')}</ChessHeader>
    <ChessButton style={styles.button} onPress={eraseStatistics}>{i18n.t('statistics.resetConfirmation')}</ChessButton>
    <ChessButton style={styles.button} onPress={onRequestClose}>{i18n.t('statistics.resetDenial')}</ChessButton>
  </CenteredModal>
);

StatisticsResetModal.propTypes = {
  style: CenteredModal.propTypes.style,
  visible: PropTypes.bool.isRequired,
  eraseStatistics: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

StatisticsResetModal.defaultProps = {
  style: undefined
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
