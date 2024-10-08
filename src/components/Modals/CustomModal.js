import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('5%'),
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: wp('4.5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  modalButton: {
    backgroundColor: '#F1A801',
    borderRadius: wp('1%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
  },
  modalButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});

export default CustomModal;