import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { StyleSheet, View, Dimensions } from 'react-native';
import { DragContainer } from 'react-native-drag-drop';

import { TileDropZone } from './tile-drop-zone';
import { ChessText } from '../../../shared/chess-text';
import { ChessButton } from '../../../shared/chess-button';

import { SettingsActions } from '../../../../stores/settings-store';

// CustomBoardSetup provides interface to make custom chess board layouts

// Note: Dragging doesn't seem to work well with scrolling view.
// This may make dragging hard on smaller devices
// If support of this is needed, may need to redo the implementation

export class CustomBoardSetup extends Component {

  constructor(){
    super();
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  updateBoardPosition(pieceData, prevPieceType, x, y){
    if(pieceData.pieceType != prevPieceType){
      SettingsActions.setPiecePosition(pieceData.pieceType, x, y);
    }
    // If draggable piece is from the board, the pieces should be swapped
    if(pieceData.isOnBoard){
      SettingsActions.setPiecePosition(prevPieceType, pieceData.x, pieceData.y);
    }
  }

  // Prevents scrolling when dragging (note: doesn't work reliably)
  onDragStart(){
    this.props.toggleScroll(false);
  }

  // Piece should be removed from board if dragged away from board
  onDragEnd(e, zones){
    if(zones.length == 0 && e.data.isOnBoard){
      let pieceData = e.data;
      SettingsActions.setPiecePosition(' ', pieceData.x, pieceData.y);
    }
    this.props.toggleScroll(true);
  }
  
  render(){
    let rowSize = 8;
    let margin = 5;
    let size = (Dimensions.get('window').width / rowSize) - margin;
    return (
      <View style={[styles.container, this.props.style]}>
				<ChessText style={styles.text}>{i18n.t('settings.customBoard.title')}</ChessText>

				<DragContainer style={styles.dragContainer} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
          <ChessText>{i18n.t('settings.customBoard.pieceOptions')}</ChessText>
          <View style={styles.tileContainer}>
            {this.renderPieceOptions(size)}    
          </View>       

          <ChessText>{i18n.t('settings.customBoard.board')}</ChessText>
          <View style={styles.tileContainer}>
            {this.renderBoardRow(1, size)}
            {this.renderBoardRow(0, size)}
          </View>

          <ChessButton onPress={() => SettingsActions.resetPiecePositions()}>{i18n.t('settings.customBoard.resetToDefault')}</ChessButton>
        </DragContainer>

			</View>
    )
  }

  renderPieceOptions(size){
    let typeOptions = ['P', 'R', 'K', 'B', 'Q', 'X'];
    return this.renderRow(typeOptions, 0, size, false);
  }

  renderBoardRow(row, size){
    let types = this.props.positions[row];
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