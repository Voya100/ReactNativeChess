import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { StyleSheet } from 'react-native';

import { SettingRow } from './setting-row';
import { SliderWithNumber } from '../../../shared/slider-with-number';

export class GameSpeedSliderRow extends Component {
  
  render(){
    return (
      <SettingRow title={i18n.t('settings.gameSpeed')}>
				<SliderWithNumber
					style={styles.slider}
					step={1} 
					minimumValue={1} 
					maximumValue={5} 
					value={this.props.value} 
					onSlidingComplete={this.props.onSlidingComplete}
				/>
			</SettingRow>
    )
  }
}

const styles = StyleSheet.create({
	slider: {
		flex: 5
	}
});