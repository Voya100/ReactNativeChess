import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { ChessText } from '../shared/chess-text';

export class ChessFooter extends Component {
  render() {
    return (
      <View style={[this.props.style, styles.buttonContainer]}>
        <View style={styles.buttonRow}>
          <ChessNavButton title='New game'/>
          <ChessNavButton title='Game mode'/>
          <ChessNavButton title='Settings'/>
        </View>
        <View style={styles.buttonRow}>
          <ChessNavButton title='Statistics'/>
          <ChessNavButton title='Instructions'/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'space-around'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 110,
    minWidth: 110,
    flex: 1
  }
});

// TODO: replace with touchable highlight
class ChessNavButton extends Component{
  render(){
    return <View style={styles.button}><Button title={this.props.title} onPress={() => {}} /></View>
  }
}