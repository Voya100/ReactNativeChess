import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../../shared/chess-text'

export class ChessSettings extends Component {
  static navigationOptions = {
      title: 'Settings',
  };

  render() {

    return (
      <View>
        <ChessText>Settings</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});