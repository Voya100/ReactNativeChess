import React, { Component } from 'react';
import { View } from 'react-native';
import { DropZone } from 'react-native-drag-drop';

import { DraggablePiece } from './draggable-piece';

import { colors } from '../../../colors';

// A board tile, on which draggable pieces can be dropped
// Contains draggable piece, if a piece is on the tile

export class TileDropZone extends Component {

  constructor(){
    super();
    this.state = {isEntered: false}
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  onEnter(){
    this.setState({isEntered: true});
  }

  onLeave(){
    this.setState({isEntered: false});
  }
  
  render(){
    let size = {width: this.props.size, height: this.props.size};
    return (
      <DropZone onEnter={this.onEnter} onLeave={this.onLeave} onDrop={this.props.onDrop}>
        <View style={[{backgroundColor: this.color()}, size]}>
          {this.props.data.pieceType && <DraggablePiece data={this.props.data} size={this.props.size}/>}
        </View>
      </DropZone>
    )
  }

  color(){
    if(this.state.isEntered && this.props.data.isOnBoard){
      return colors.active;
    }else{
      return (this.props.data.x + this.props.data.y) % 2 == 0 ? colors.blackTile : colors.whiteTile;
    }
  }
}