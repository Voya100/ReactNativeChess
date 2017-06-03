import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { DragContainer } from 'react-native-drag-drop';

import { TileDropZone } from './tile-drop-zone';

import { ChessText } from '../../../shared/chess-text';

export class CustomBoardSetup extends Component {
  
  render(){
    let rowSize = 8;
    let margin = 5;
    let size = (Dimensions.get('window').width / rowSize) - margin;
    return (
      <View style={[styles.container, this.props.style]}>
				<ChessText style={styles.text}>Custom board</ChessText>
				<DragContainer style={styles.dragContainer}>
          <ChessText>Piece options (drag and drop)</ChessText>
          <View style={styles.tileContainer}>
            {this.renderPieceOptions(size)}            
          </View>
        </DragContainer>
			</View>
    )
  }

  renderPieceOptions(size){
    let options = ['P', 'R', 'K', 'B', 'Q', 'X'];
    return options.map((pieceType, i) => {
      return <TileDropZone data={{pieceType: pieceType, x: i, y: 0}} size={size} key={i}/>
    })
  }
}

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
    padding: 5,
    flex: 1
	},
  dragContainer: {
    alignItems: 'center'
  },
  tileContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 5
  }
});