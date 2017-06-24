import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';
import { StyleSheet } from 'react-native';

import { SettingRow } from './setting-row';
import { SliderWithNumber } from '../../../shared/slider-with-number';

export const GameSpeedSliderRow = ({value, onSlidingComplete}) => (
  <SettingRow title={i18n.t('settings.gameSpeed')}>
    <SliderWithNumber
      style={styles.slider}
      step={1} 
      minimumValue={1} 
      maximumValue={5} 
      value={value} 
      onSlidingComplete={onSlidingComplete}
    />
  </SettingRow>
)

GameSpeedSliderRow.propTypes = {
  value: PropTypes.number.isRequired,
  onSlidingComplete: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  slider: {
    flex: 5
  }
});
