import React from 'react';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';
import { StyleSheet, ScrollView } from 'react-native';

import { SettingsStore, SettingsActions } from '../../../stores/settings-store';

import { ChessHeader } from '../../shared/chess-header';
import { ChessButton } from '../../shared/chess-button';

import { BoardReversedSwitchRow } from './setting-rows/board-reversed-switch-row';
import { GameSpeedSliderRow } from './setting-rows/game-speed-slider-row';
import { LanguagePickerRow } from './setting-rows/language-picker-row';
import { MaxRoundsSliderRow } from './setting-rows/max-rounds-slider-row';

import { CustomBoardSetup } from './custom-board-setup/custom-board-setup';

import { SettingsHelpModal } from './settings-help-modal';

export class ChessSettings extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('settings.title'),
  };

  constructor(){
    super();
    this.store = SettingsStore;
		this.updateLanguage = this.updateLanguage.bind(this);
		this.state = {helpModalOpen: false};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

	updateLanguage(language){
		SettingsActions.setLanguage(language);
		// A trick to make nav bar update
		this.props.navigation.setParams({language});
	}

	updateGameSpeed(speed){
		SettingsActions.setGameSpeed(speed);
	}

	updateMaxRounds(rounds){
		SettingsActions.setMaxRounds(rounds);
	}

	updateBoardReversed(reversed){
		SettingsActions.setBoardReversed(reversed);
	}

	updateBoardLayout(row1, row2){
		SettingsActions.setPiecePositions(row1, row2);
	}

	openModal(){
		this.setState({helpModalOpen: true});
	}

	closeModal(){
		this.setState({helpModalOpen: false});
	}

  render() {
    return (
      <ScrollView style={styles.container}>
        <ChessHeader style={styles.header}>{i18n.t('settings.generalSettings')}</ChessHeader>
				<ChessButton style={styles.helpButton} onPress={this.openModal}>?</ChessButton>
				<LanguagePickerRow selectedValue={this.state.language} languageOptions={Object.keys(i18n.translations)} onValueChange={this.updateLanguage}/>
				<GameSpeedSliderRow value={this.state.gameSpeed} onSlidingComplete={this.updateGameSpeed}/>
				<MaxRoundsSliderRow value={this.state.maxRounds} onSlidingComplete={this.updateMaxRounds}/>
				<BoardReversedSwitchRow value={this.state.boardReversed} onValueChange={this.updateBoardReversed}/>
				<CustomBoardSetup positions={this.state.piecePositions} />

				<SettingsHelpModal visible={this.state.helpModalOpen} onRequestClose={this.closeModal}/>
			</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
		position: 'relative',
		flex: 1
	},
	header: {
 		margin:5
	},
	helpButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		position: 'absolute',
		top: 5,
		right: 5,
		margin: 0
	}
});