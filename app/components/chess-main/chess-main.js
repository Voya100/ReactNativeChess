import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../shared/chess-text';

export class ChessMain extends Component {
  render() {
    return (
      <View>
        <ChessText>
          Board
        </ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});