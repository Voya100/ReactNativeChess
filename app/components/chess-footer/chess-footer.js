import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../shared/chess-text';

export class ChessFooter extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <ChessText>
          Footer
        </ChessText>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});