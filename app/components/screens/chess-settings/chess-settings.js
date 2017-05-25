import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ChessText } from '../../shared/chess-text'

export class ChessSettingsView extends Component {
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