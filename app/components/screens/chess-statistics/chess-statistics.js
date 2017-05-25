import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ChessText } from '../../shared/chess-text'

export class ChessStatistics extends Component {
  static navigationOptions = {
      title: 'Statistics',
  };

  render() {

    return (
      <View>
        <ChessText>Statistics</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});