import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import { ChessText } from './chess-text';
import { colors } from '../colors';

export const ChessButton = ({active, children, style, onPress}) => {
  let activeColor = active ? styles.active : {};
  return (
    <TouchableOpacity style={[styles.button, style, activeColor]} onPress={onPress} activeOpacity={0.4}>
      <ChessText>{children}</ChessText>
    </TouchableOpacity>
  );
}
console.warn(TouchableOpacity.propTypes.style)
ChessButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  style: View.propTypes.style,
  onPress: PropTypes.func.isRequired
}

ChessButton.defaultProps = {
  active: false,
  style: undefined
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.button,
    padding: 10,
    margin: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  active: {
    backgroundColor: colors.active
  }
});
