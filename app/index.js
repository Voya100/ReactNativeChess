import React, { Component } from 'react';
import { StyleSheet,  View } from 'react-native';

import { ChessHeader } from './components/chess-header/chess-header';
import { ChessMain } from './components/chess-main/chess-main';
import { ChessFooter } from './components/chess-footer/chess-footer';

export default class ReactNativeChess extends Component {
  render() {
    return (
      <View>
        <ChessHeader style={styles.header}></ChessHeader>
        <ChessMain></ChessMain>
        <ChessFooter style={styles.footer}></ChessFooter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  footer: {
    margin: 10,
    flex: 1
  }
});