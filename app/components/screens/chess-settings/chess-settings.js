import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { ChessText } from '../../shared/chess-text'

const border = 2;
const margin = 2;

export class ChessSettingsView extends Component {
  static navigationOptions = {
      title: 'Settings',
  };

  render() {

    return (
      <View style={[styles.main]}>
        <ChessText>Settings</ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});