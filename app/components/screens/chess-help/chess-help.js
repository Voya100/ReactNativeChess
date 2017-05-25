import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ChessText } from '../../shared/chess-text'

export class ChessHelp extends Component {
  static navigationOptions = {
      title: 'Help',
  };

  render() {

    return (
      <View>
        <ChessText>Help</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});