import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { chessImages } from '../../../images/images'

export class BoardPiece extends Component {
  render() {
    let size = {
      height: this.props.tileSize,
      width: this.props.tileSize
    }
    let position = {
      position: 'absolute',
      left: this.pieceLeftLocation(),
      top: this.pieceTopLocation(),
      zIndex: 2
    };

    return (
      <TouchableHighlight onPress={this.props.onPress} style={[size, position]}>
        <Image style={size} source={this.image()}/>
      </TouchableHighlight>
    );
  }

  pieceTopLocation(){
    console.log(this.props.tileSize);
    if(!this.props.boardReversed){
      return this.props.y * this.props.tileSize;
    }else{
      return this.props.x * this.props.tileSize;
    }
  }
  
  pieceLeftLocation(){
    if(!this.props.boardReversed){
      console.log(this.props.x, this.props)
      return this.props.x * this.props.tileSize;
    }else{
      let maxIndex = 7;
      return (maxIndex -this.props.y) * this.props.tileSize;
    }
  }
  
  image(){
    return chessImages[this.props.color + '-' + this.props.type];
  }

}