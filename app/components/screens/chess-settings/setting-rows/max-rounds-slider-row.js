import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'react-native-i18n';
import { StyleSheet } from 'react-native';

import { SettingRow } from './setting-row';
import { SliderWithNumber } from '../../../shared/slider-with-number';

export const MaxRoundsSliderRow = ({value, onSlidingComplete}) => (
  <SettingRow title={i18n.t('settings.maxRounds')}>
    <SliderWithNumber
      style={styles.slider}
      step={25}
      minimumValue={25}
      maximumValue={250}
      value={value}
      onSlidingComplete={onSlidingComplete}
    />
  </SettingRow>
)

MaxRoundsSliderRow.propTypes = {
  value: PropTypes.number.isRequired,
  onSlidingComplete: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  slider: {
    flex: 5
  }
});
