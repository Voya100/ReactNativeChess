import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { StyleSheet } from 'react-native';

import { SettingRow } from './setting-row';
import { SliderWithNumber } from '../../../shared/slider-with-number';

export class MaxRoundsSliderRow extends Component {
  
  render(){
    return (
      <SettingRow title={i18n.t('settings.maxRounds')}>
				<SliderWithNumber
					style={styles.slider}
					step={25}
					minimumValue={25}
					maximumValue={250}
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