import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChessText } from '../../shared/chess-text';

export class GuidePage extends Component {
  render() {
    console.log('guide page rendered')
    return (
        <ChessText style={{flex: 1}}>Text {this.props.id}</ChessText>
    );
  }
}

const styles = StyleSheet.create({
});