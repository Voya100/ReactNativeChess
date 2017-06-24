import React, { Component } from 'react';
import { Image, TouchableHighlight, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import { chessImages } from '../../../../images/images';
import { Tile } from '../../../../game/tile';

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
      duration: Math.floor(700 / speed),
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        duration: Math.floor(400 / speed)
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        springDamping: 0.4,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        duration: Math.floor(200 / speed),
        delay: Math.floor(200 / speed)
      }
    }
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
        <Image style={size} source={this.image()} />
      </TouchableHighlight>
    );
  }
}

BoardPiece.propTypes = {
  boardReversed: PropTypes.bool.isRequired,
  piece: PropTypes.shape({
    color: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  speed: PropTypes.number.isRequired,
  tile: PropTypes.instanceOf(Tile).isRequired,
  tileSize: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
}
