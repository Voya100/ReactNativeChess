import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';

export class BoardTile extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.tile, {backgroundColor: this.props.color}]}><View></View></TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    flex: 1
  }
});