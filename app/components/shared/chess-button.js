import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ChessText } from './chess-text';

import { colors } from '../colors';

export class ChessButton extends Component {
  render() {
    let activeColor = this.props.active ? styles.active : {};
    return (
			<TouchableOpacity style={[styles.button, this.props.style, activeColor]} onPress={this.props.onPress} activeOpacity={0.4}>
				<ChessText>{this.props.children}</ChessText>
			</TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.button,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
		flex: 1
  },
	active: {
		backgroundColor: colors.active
	}
});