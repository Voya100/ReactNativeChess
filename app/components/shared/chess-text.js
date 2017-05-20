import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export class ChessText extends Component {
  render() {
    return (
        <Text style={styles.text}>
          {this.props.children}
        </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
});