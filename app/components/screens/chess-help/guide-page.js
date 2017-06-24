import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';

import { ChessText } from '../../shared/chess-text';
import { ChessHeader } from '../../shared/chess-header';

export const GuidePage = ({id}) => (
  <ScrollView style={styles.container}>
    <ChessHeader>{i18n.t('help.' + id + '.title')}</ChessHeader>
    <ChessText style={styles.text}>{i18n.t('help.' + id + '.content')}</ChessText>
  </ScrollView>
);

GuidePage.propTypes = {
  id: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  text: {
    fontSize: 14,
    flex: 1
  }
});
