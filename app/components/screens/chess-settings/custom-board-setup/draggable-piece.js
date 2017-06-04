import React, { Component } from 'react';
import { Image } from 'react-native';

import { Draggable } from 'react-native-drag-drop';

import { chessImages } from '../../../../images/images';

export class DraggablePiece extends Component {
  
  render(){
    let sizeStyle = {width: this.props.size, height: this.props.size};
    return (
      <Draggable data={this.props.data} dragOn='onPressIn'>
        <Image source={this.image(this.props.data.pieceType)} style={sizeStyle}/>
      </Draggable>
    )
  }
  
  image(typeId){
    switch(typeId){
      case 'P':
        return chessImages['white-pawn'];
      case 'R':
        return chessImages['white-rook'];
      case 'K':
        return chessImages['white-knight'];
      case 'B':
        return chessImages['white-bishop'];
      case 'Q':
        return chessImages['white-queen'];
      case 'X':
        return chessImages['white-king'];
      default:
        return undefined;
    }
  }
}