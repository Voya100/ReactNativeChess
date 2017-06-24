import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../colors';

// Centered modal that can be closed by pressing outside of it

// Touchables close modal when pressed outside of the content area

export const CenteredModal = ({children, style, visible, onRequestClose}) => (
  <Modal animationType={"fade"} visible={visible} onRequestClose={onRequestClose} transparent>
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalContent, style]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

CenteredModal.propTypes = {
  children: PropTypes.node.isRequired,
  style: View.propTypes.style,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

CenteredModal.defaultProps = {
  style: undefined
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  modalContent: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    padding: 10
  }
});
