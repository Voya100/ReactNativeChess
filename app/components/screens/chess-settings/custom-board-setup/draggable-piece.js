import React, { Component } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { Draggable } from 'react-native-drag-drop';

import { chessImages } from '../../../../images/images';

// A piece that can be dragged

export class DraggablePiece extends Component {
  
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
  
  render(){
    let sizeStyle = {width: this.props.size, height: this.props.size};
    return (
      <Draggable data={this.props.data} dragOn='onPressIn'>
        <Image source={this.image(this.props.data.pieceType)} style={sizeStyle} />
      </Draggable>
    )
  }
}

DraggablePiece.propTypes = {
  size: PropTypes.number.isRequired,
  data: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    pieceType: PropTypes.string,
    isOnBoard: PropTypes.bool
  }).isRequired
}
