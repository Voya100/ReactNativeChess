import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../shared/chess-text'

export class ChessHeader extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <ChessText>
          Chess
        </ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});