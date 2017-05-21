import React, { Component } from 'react';
import { Image, TouchableHighlight, LayoutAnimation } from 'react-native';
import { chessImages } from '../../../images/images'

export class BoardPiece extends Component {


  shouldComponentUpdate(nextProps){
    return nextProps.piece !== this.props.piece || nextProps.boardReversed !== this.props.boardReversed;
  }

  componentWillUpdate() { 
    LayoutAnimation.linear();
  }

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
    if(!this.props.boardReversed){
      return this.props.piece.tile.y * this.props.tileSize;
    }else{
      return this.props.piece.tile.x * this.props.tileSize;
    }
  }
  
  pieceLeftLocation(){
    if(!this.props.boardReversed){
      return this.props.piece.tile.x * this.props.tileSize;
    }else{
      let maxIndex = 7;
      return (maxIndex -this.props.piece.tile.y) * this.props.tileSize;
    }
  }
  
  image(){
    return chessImages[this.props.piece.color + '-' + this.props.piece.type];
  }

}