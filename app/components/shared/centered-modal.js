import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

import { colors } from '../colors';

// Centered modal that can be closed by pressing outside of it

export class CenteredModal extends Component {

  render() {
    // Touchables close modal when pressed outside of the content area
    return (
      <Modal animationType={"fade"} transparent={true} onRequestClose={this.props.onRequestClose} visible={this.props.visible}>
        <TouchableWithoutFeedback onPress={this.props.onRequestClose}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent,this.props.style]}>
                {this.props.children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
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
