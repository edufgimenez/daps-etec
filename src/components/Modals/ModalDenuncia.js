import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ visible, message, onClose, onConfirm }) => {
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
              <Text style={styles.modalButtonText}>Cadastrar</Text>
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
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  confirmButton: {
    backgroundColor: '#F1A801',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});

export default CustomModal;