import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { DragContainer } from 'react-native-drag-drop';

import { TileDropZone } from './tile-drop-zone';

import { ChessText } from '../../../shared/chess-text';

export class CustomBoardSetup extends Component {

  updateBoardPosition(pieceData, prevPieceType, x, y){
    console.log("board updated", pieceData, prevPieceType, x, y);
  }
  
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

          <ChessText>Board</ChessText>
          <View style={styles.tileContainer}>
            {this.renderBoardRow(1, size)}
            {this.renderBoardRow(0, size)}
          </View>
          
        </DragContainer>
			</View>
    )
  }

  renderPieceOptions(size){
    let typeOptions = ['P', 'R', 'K', 'B', 'Q', 'X'];
    return this.renderRow(typeOptions, 0, size, false);
  }

  renderBoardRow(row, size){
    let types = this.props.positions[row].split('');
    console.log(types)
    return this.renderRow(types, row, size, true);
  }

  renderRow(types, y, size, isBoard){
    let dropZones = types.map((pieceType, x) => {
      let onDrop = isBoard ? (data) => this.updateBoardPosition(data, pieceType, x, y) : undefined;
      return <TileDropZone data={{pieceType: pieceType, isOnBoard: isBoard, x, y}} size={size} key={x} onDrop={onDrop}/>
    })
    return <View style={styles.tileRow}>{dropZones}</View>;
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
    borderWidth: 1,
    margin: 5
  },
  tileRow: {
    flexDirection: 'row'
  }
});