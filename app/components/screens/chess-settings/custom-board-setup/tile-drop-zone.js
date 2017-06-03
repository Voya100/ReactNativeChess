import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { DropZone } from 'react-native-drag-drop';

import { DraggablePiece } from './draggable-piece';

import { colors } from '../../../colors';

export class TileDropZone extends Component {
  
  render(){
    let size = {width: this.props.size, height: this.props.size};
    let color = (this.props.data.x + this.props.data.y) % 2 == 0 ? colors.blackTile : colors.whiteTile;
    return (
      <DropZone onDrop={this.props.onDrop}>
        <View style={[styles.tile, {backgroundColor: color}, size]}>
          {this.props.data.pieceType && <DraggablePiece data={this.props.data} size={this.props.size}/>}
        </View>
      </DropZone>
    )
  }
}

const styles = StyleSheet.create({
});