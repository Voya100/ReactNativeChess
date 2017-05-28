import React from 'react';
import Reflux from 'reflux';
import i18n from 'react-native-i18n';
import { StyleSheet, View, Picker, Slider, Switch } from 'react-native';

import { SettingsStore, SettingsActions } from '../../../stores/settings-store';

import { ChessText } from '../../shared/chess-text';
import { ChessHeader } from '../../shared/chess-header';
import { SliderWithNumber } from '../../shared/slider-with-number';

export class ChessSettings extends Reflux.Component {
  static navigationOptions = {
    tabBarLabel: () => i18n.t('settings.title'),
  };

  constructor(){
    super();
    this.store = SettingsStore;
		this.updateGameSpeed = this.updateGameSpeed.bind(this);
		this.updateTempSpeed = this.updateTempSpeed.bind(this);
		this.updateMaxRounds = this.updateMaxRounds.bind(this);
		this.updateTempMaxRounds = this.updateTempMaxRounds.bind(this);
		this.state = {tempSpeed: SettingsStore.state.gameSpeed, tempMaxRounds: SettingsStore.state.maxRounds};
  }

	// tempSpeed and tempMaxRounds need to be initialized to right value after settings are fetchhed from AsyncStorage
	componentDidUpdate(prevProps, prevState){
		if(prevState.gameSpeed != this.state.gameSpeed){
			this.setState({tempSpeed: this.state.gameSpeed});
		}
		if(prevState.maxRounds != this.state.maxRounds){
			this.setState({tempMaxRounds: this.state.maxRounds});
		}
	}

	updateLanguage(language){
		console.log(language);
		SettingsActions.setLanguage(language);
		// A trick to make nav bar update
		this.props.navigation.setParams({language});
		this.saveSettings();
	}

	updateTempSpeed(tempSpeed){
		this.setState({tempSpeed});
	}

	updateGameSpeed(speed){
		SettingsActions.setGameSpeed(speed);
	}

	updateTempMaxRounds(tempMaxRounds){
		this.setState({tempMaxRounds});
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
				{this.renderLanguagePicker()}
				{this.renderGameSpeedSlider()}
				{this.renderMaxRoundsSlider()}
				{this.renderBoardReversedSwitch()}
			</View>
    );
  }

	renderLanguagePicker(){		
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={i18n.t('settings.language')} style={{borderTopWidth: 1}}>
				<Picker style={styles.languagePicker} 
								selectedValue={this.state.language} 
								onValueChange={language => this.updateLanguage(language)}
								prompt={i18n.t('settings.selectLanguage')}> 
					{this.renderLanguageOptions()}
				</Picker>
			</RowContainer>
		);
	}
	
	renderRowContainer(props){
		return (
			<View style={[styles.optionContainer, props.style]}>
				<ChessText style={styles.text}>{props.title}</ChessText>
				{props.children}
			</View>
		)
	}

  renderLanguageOptions(){
    return Object.keys(i18n.translations).map((language, i) => {
      return <Picker.Item label={ i18n.translations[language].id } value={ language } key={i}/> 
    });
  }

	renderGameSpeedSlider(){
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={'Game speed'}>
				<SliderWithNumber
					step={1} 
					minimumValue={1} 
					maximumValue={5} 
					value={this.state.gameSpeed} 
					tempValue={this.state.tempSpeed}
					onSlidingComplete={this.updateGameSpeed}
					onValueChange={this.updateTempSpeed}
				/>
			</RowContainer>
		)
	}

	renderMaxRoundsSlider(){
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={'Max rounds'}>
				<SliderWithNumber
					step={50}
					minimumValue={50}
					maximumValue={500}
					value={this.state.maxRounds}
					tempValue={this.state.tempMaxRounds}
					onSlidingComplete={this.updateMaxRounds}
					onValueChange={this.updateTempMaxRounds}
				/>
			</RowContainer>
		);
	}

	renderBoardReversedSwitch(){
		let RowContainer = this.renderRowContainer;
		return (
			<RowContainer title={'Reverse board'}>
				<Switch value={this.state.boardReversed} onValueChange={this.updateBoardReversed}/>
			</RowContainer>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	},
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1
	},
	header: {
 		margin:5
	},
	text: {
		flex: 1,
		margin: 10
	},
	languagePicker: {
		flex: 2,
		width: 100
	}
});