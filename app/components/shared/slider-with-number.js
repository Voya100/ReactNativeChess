import React, { Component } from 'react';
import { View, StyleSheet, Slider } from 'react-native';

import { ChessText } from './chess-text';

export class SliderWithNumber extends Component {

  constructor(){
    super();
    this.state = {tempValue: null};
    this.onValueChange = this.onValueChange.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
  }

  // Slider lags if store is updated directly with each value change, 
  // which is why true value is only set after sliding is complete
  onValueChange(value){
    this.setState({tempValue: value});
  }

  onSlidingComplete(value){
    this.props.onSlidingComplete(value);
    this.setState({tempValue: null});
  }

  render() {
    // tempValue is null when slider isn't dragged
    // This way slider number should update to right value, even when changed by other means
    let value = this.state.tempValue ? this.state.tempValue : this.props.value;
    return (
      <View style={[styles.sliderContainer, this.props.style]}>
        <ChessText style={styles.text}>{value}</ChessText>
        <Slider
          style={styles.slider} 
          step={this.props.step}
          minimumValue={this.props.minimumValue}
          maximumValue={this.props.maximumValue}
          value={this.props.value}
          onSlidingComplete={this.onSlidingComplete}
          onValueChange={this.onValueChange}
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
		flex: 5
	}
});