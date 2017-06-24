import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../../../colors';

export class BoardTile extends Component {

  shouldComponentUpdate(nextProps){
    return nextProps.color !== this.props.color;
  }

  render() {
    return (
      <TouchableHighlight 
        onPress={this.props.onPress} 
        style={[styles.tile, {backgroundColor: this.props.color}]} 
        activeOpacity={0.6} 
        underlayColor={colors.highlightTile}
      >
        <View />
      </TouchableHighlight>
    );
  }
}

BoardTile.propTypes = {
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  tile: {
    flex: 1
  }
});
