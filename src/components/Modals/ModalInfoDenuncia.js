import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomModal from './CustomModal';
import { supabase } from '../../utils/supabase'; // Import supabase

const ModalInfoDenuncia = ({ visible, denuncia, onClose, onRefresh }) => {
  const [motivoCancelamento, setMotivoCancelamento] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [customModalMessage, setCustomModalMessage] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const cancelarDenuncia = async () => {
    try {
      const { error: updateError } = await supabase
        .from('denuncias')
        .update({ motivo_cancelamento: motivoCancelamento })
        .eq('id', denuncia.id);

      if (updateError) throw updateError;

      const { error: statusError } = await supabase
        .from('denuncias_status')
        .update({ status_id: 7, data_atualizacao: new Date() })
        .eq('denuncia_id', denuncia.id);

      if (statusError) throw statusError;

      setSuccessModalVisible(true);
    } catch (error) {
      console.error('Erro ao cancelar denúncia:', error);
    }
  };

  const handleCancel = () => {
    if (motivoCancelamento.length < 15) {
      setCustomModalMessage('O campo Motivo do cancelamento é obrigatório e deve ter no mínimo 15 caracteres.');
      setCustomModalVisible(true);
      return;
    }
    cancelarDenuncia();
  };

  const handleMotivoChange = (text) => {
    setMotivoCancelamento(text);
    setCharCount(text.length);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    onClose();
    onRefresh();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalhes da Denúncia</Text>
          {denuncia ? (
            <ScrollView style={styles.scrollView}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações Gerais</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Protocolo:</Text> {denuncia.id}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Descrição:</Text> {denuncia.descricao}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Data da Denúncia:</Text> {new Date(denuncia.data_denuncia).toLocaleString('pt-BR')}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Última Atualização:</Text> {new Date(denuncia.ultima_atualizacao).toLocaleString('pt-BR')}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Anônimo:</Text> {denuncia.anonimo ? 'Sim' : 'Não'}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Status:</Text> {denuncia.status_descricao}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Localização</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Cidade:</Text> {denuncia.cidade}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Bairro:</Text> {denuncia.bairro}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>CEP:</Text> {denuncia.cep}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Rua:</Text> {denuncia.rua}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Número:</Text> {denuncia.numero}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Complemento:</Text> {denuncia.complemento}</Text>
                <Text style={styles.infoText}><Text style={styles.label}>Estado:</Text> {denuncia.estado}</Text>
              </View>

              {denuncia.status_descricao === 'Cancelada pelo Órgão' || denuncia.status_descricao === 'Cancelada pelo Solicitante' ? (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Motivo do Cancelamento</Text>
                  <Text style={styles.infoText}>{denuncia.motivo_cancelamento}</Text>
                </View>
              ) : (
                denuncia.status_descricao !== 'Finalizada' && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cancelar Denúncia</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Motivo do cancelamento (Min 15 caracteres)*"
                      value={motivoCancelamento}
                      onChangeText={handleMotivoChange}
                      maxLength={100}
                    />
                    <Text style={styles.charCounter}>{charCount}/100</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                      <Text style={styles.cancelButtonText}>Cancelar Denúncia</Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </ScrollView>
          ) : (
            <Text>Carregando detalhes da denúncia...</Text>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomModal
        visible={customModalVisible}
        message={customModalMessage}
        onClose={() => setCustomModalVisible(false)}
      />

      <CustomModal
        visible={successModalVisible}
        message="Denúncia cancelada com sucesso."
        onClose={handleSuccessModalClose}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('90%'),
    height: 'auto',
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
  },
  scrollView: {
    width: '100%',
  },
  section: {
    marginBottom: hp('1.5%'),
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: hp('0.5%'),
    textAlign: 'center',
  },
  infoText: {
    fontSize: RFValue(14),
    marginBottom: hp('0.5%'),
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: wp('2%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  charCounter: {
    alignSelf: 'flex-end',
    fontSize: RFValue(10),
    color: '#888',
    marginBottom: hp('1%'),
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: wp('3%'),
    borderRadius: 5,
    marginTop: hp('0.2%'),
    alignItems: 'center',
    width: wp('60%'), // Ajuste a largura conforme necessário
    alignSelf: 'center', // Centraliza o botão
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: wp('3%'),
    borderRadius: 5,
    marginTop: hp('0%'), // Reduzir a margem superior para diminuir a distância
    width: wp('30%'), // Ajuste a largura conforme necessário
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: RFValue(14),
    textAlign: 'center',
  },
});

export default ModalInfoDenuncia;