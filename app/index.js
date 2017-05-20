import React, { Component } from 'react';
import { StyleSheet,  View, Dimensions } from 'react-native';

import { ChessHeader } from './components/chess-header/chess-header';
import { ChessMain } from './components/chess-main/chess-main';
import { ChessFooter } from './components/chess-footer/chess-footer';

export default class ReactNativeChess extends Component {

  constructor(){
    super();
  }

  render() {
    let boardSize = Dimensions.get('window').width;
    let mainStyle = {
      width: boardSize,
      height: boardSize,
      backgroundColor: 'black'
    }

    return (
      <View style={[styles.container]}>
        <ChessHeader style={styles.header}></ChessHeader>
        <ChessMain style={mainStyle}></ChessMain>
        <ChessFooter style={styles.footer}></ChessFooter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6cfaf',
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    margin: 10
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  }
});