import React, { Component } from 'react';
import { View, StyleSheet, Slider } from 'react-native';

import { ChessText } from './chess-text';

export class SliderWithNumber extends Component {
  render() {
    return (
      <View style={styles.sliderContainer}>
        <ChessText style={styles.text}>{this.props.tempValue}</ChessText>
        <Slider
          style={styles.slider} 
          step={this.props.step}
          minimumValue={this.props.minimumValue}
          maximumValue={this.props.maximumValue}
          value={this.props.value}
          onSlidingComplete={this.props.onSlidingComplete}
          onValueChange={this.props.onValueChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
		flex: 1,
		margin: 5
  },
	sliderContainer: {
		flex: 2,
		flexDirection: 'row'
	},
	slider: {
		flex: 6
	}
});