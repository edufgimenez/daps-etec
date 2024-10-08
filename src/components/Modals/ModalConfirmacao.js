import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ModalConfirmacao = ({ visible, message, onClose, onConfirm }) => {
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.modalButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: wp('1%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    flex: 1,
    marginHorizontal: wp('1%'),
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  confirmButton: {
    backgroundColor: '#F1A801',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});

export default ModalConfirmacao;