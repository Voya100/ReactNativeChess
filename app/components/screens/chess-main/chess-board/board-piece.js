import React, { Component } from 'react';
import { Image, TouchableHighlight, LayoutAnimation } from 'react-native';
import { chessImages } from '../../../../images/images';

import { colors } from '../../../colors';

export class BoardPiece extends Component {

  shouldComponentUpdate(nextProps){
    return nextProps.tile !== this.props.tile || nextProps.boardReversed !== this.props.boardReversed;
  }

  // Transition animation
  componentWillUpdate() { 
    LayoutAnimation.configureNext(this.animationConfig());
  }
  // Fade out animation
  componentWillUnmount(){
    LayoutAnimation.configureNext(this.animationConfig());
  }

  animationConfig(){
    let speed = this.props.speed;
    return {
      duration: 700 / speed,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        duration: 400 / speed
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        springDamping: 0.4,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        duration: 200 / speed,
        delay: 200 / speed
      }
    }
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
      <TouchableHighlight onPress={this.props.onPress} style={[size, position]} activeOpacity={0.6} underlayColor={colors.highlightTile}>
        <Image style={size} source={this.image()}/>
      </TouchableHighlight>
    );
  }

  pieceTopLocation(){
    if(!this.props.boardReversed){
      return this.props.tile.y * this.props.tileSize;
    }else{
      return this.props.tile.x * this.props.tileSize;
    }
  }
  
  pieceLeftLocation(){
    if(!this.props.boardReversed){
      return this.props.tile.x * this.props.tileSize;
    }else{
      let maxIndex = 7;
      return (maxIndex -this.props.tile.y) * this.props.tileSize;
    }
  }
  
  image(){
    return chessImages[this.props.piece.color + '-' + this.props.piece.type];
  }

}