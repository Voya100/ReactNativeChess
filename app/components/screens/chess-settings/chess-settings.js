import React from 'react';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';
import { StyleSheet, View } from 'react-native';

import { SettingsStore, SettingsActions } from '../../../stores/settings-store';

import { ChessHeader } from '../../shared/chess-header';

import { BoardReversedSwitchRow } from './setting-rows/board-reversed-switch-row';
import { GameSpeedSliderRow } from './setting-rows/game-speed-slider-row';
import { LanguagePickerRow } from './setting-rows/language-picker-row';
import { MaxRoundsSliderRow } from './setting-rows/max-rounds-slider-row';

export class ChessSettings extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('settings.title'),
  };

  constructor(){
    super();
    this.store = SettingsStore;
		this.updateLanguage = this.updateLanguage.bind(this);
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

  render() {
    return (
      <View style={styles.container}>
        <ChessHeader style={styles.header}>{i18n.t('settings.generalSettings')}</ChessHeader>
				<LanguagePickerRow selectedValue={this.state.language} languageOptions={Object.keys(i18n.translations)} onValueChange={this.updateLanguage}/>
				<GameSpeedSliderRow value={this.state.gameSpeed} onSlidingComplete={this.updateGameSpeed}/>
				<MaxRoundsSliderRow value={this.state.maxRounds} onSlidingComplete={this.updateMaxRounds}/>
				<BoardReversedSwitchRow value={this.state.boardReversed} onValueChange={this.updateBoardReversed}/>
			</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	},
	header: {
 		margin:5
	}
});