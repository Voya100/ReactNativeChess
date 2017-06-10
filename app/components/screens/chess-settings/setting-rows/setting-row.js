import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../../../shared/chess-text';

// A row that has a title (name of the setting)

export class SettingRow extends Component {
  
  render(){
    return (
      <View style={[styles.container, this.props.style]}>
				<ChessText style={styles.text}>{this.props.title}</ChessText>
				{this.props.children}
			</View>
    )
  }
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