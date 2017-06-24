import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const ChessText = ({children, style}) => (
  <Text style={[styles.text, style]}>
    {children}
  </Text>
);

ChessText.propTypes = {
  children: PropTypes.node,
  style: Text.propTypes.style
}

ChessText.defaultProps = {
  children: undefined,
  style: {}
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16
  }
});
