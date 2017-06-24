import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../../../shared/chess-text';

// A row that has a title (name of the setting)

export const SettingRow = ({children, style, title}) => (
  <View style={[styles.container, style]}>
    <ChessText style={styles.text}>{title}</ChessText>
    {children}
  </View>
)

SettingRow.propTypes = {
  children: PropTypes.node.isRequired,
  style: View.propTypes.style,
  title: PropTypes.string.isRequired
}

SettingRow.defaultProps = {
  style: undefined
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1
  },
  text: {
    flex: 3,
    margin: 9
  },
});
