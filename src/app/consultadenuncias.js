import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';
import styles from './styles/consultadenucias.style';
import CustomModal from '../components/Modals/CustomModal';
import ModalInfoDenuncia from '../components/Modals/ModalInfoDenuncia'; // Importação do ModalInfoDenuncia

export default function ConsultaDenuncias() {
  const router = useRouter();
  const [denunciasAndamento, setDenunciasAndamento] = useState([]);
  const [denunciasFinalizadas, setDenunciasFinalizadas] = useState([]);
  const [allDenunciasAndamento, setAllDenunciasAndamento] = useState([]);
  const [allDenunciasFinalizadas, setAllDenunciasFinalizadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchProtocolo, setSearchProtocolo] = useState('');
  const [searchData, setSearchData] = useState('');
  const [visibleAndamento, setVisibleAndamento] = useState(3);
  const [visibleFinalizadas, setVisibleFinalizadas] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedDenuncia, setSelectedDenuncia] = useState(null); // Estado para armazenar a denúncia selecionada
  const [refreshing, setRefreshing] = useState(false); // Estado para controle do RefreshControl

  useEffect(() => {
    fetchDenuncias();
  }, []);

  const fetchDenuncias = async () => {
    try {
      setLoading(true);
      const userSession = JSON.parse(await AsyncStorage.getItem('userSession'));
      const cpfHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, userSession.cpf);

      const { data, error } = await supabase
        .from('denuncias')
        .select(`
          *,
          denuncias_status (
            *,
            status_denuncia (descricao_status)
          )
        `)
        .or(`usuario_cpf.eq.${userSession.cpf},cpf_hash.eq.${cpfHash}`)
        .order('data_denuncia', { ascending: false });

      if (error) {
        throw error;
      }

      const andamento = [];
      const finalizadas = [];

      data.forEach(denuncia => {
        const statusDescricao = denuncia.denuncias_status[0].status_denuncia.descricao_status;
        const ultimaAtualizacao = denuncia.denuncias_status[0].data_atualizacao;
        if (statusDescricao !== 'Cancelada pelo Órgão' && statusDescricao !== 'Cancelada pelo Solicitante' && statusDescricao !== 'Finalizada') {
          andamento.push({ ...denuncia, status_descricao: statusDescricao, ultima_atualizacao: ultimaAtualizacao });
        } else {
          finalizadas.push({ ...denuncia, status_descricao: statusDescricao, ultima_atualizacao: ultimaAtualizacao });
        }
      });

      setDenunciasAndamento(andamento);
      setDenunciasFinalizadas(finalizadas);
      setAllDenunciasAndamento(andamento);
      setAllDenunciasFinalizadas(finalizadas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Finaliza o estado de refresh
    }
  };

  const refreshDenuncias = () => {
    setRefreshing(true);
    fetchDenuncias();
  };

  const handleSearchProtocolo = () => {
    const filteredAndamento = allDenunciasAndamento.filter(denuncia =>
      denuncia.id.toString().includes(searchProtocolo)
    );
    const filteredFinalizadas = allDenunciasFinalizadas.filter(denuncia =>
      denuncia.id.toString().includes(searchProtocolo)
    );
    if (filteredAndamento.length === 0 && filteredFinalizadas.length === 0) {
      setModalMessage('Nenhum resultado encontrado.');
      setModalVisible(true);
    } else {
      setDenunciasAndamento(filteredAndamento);
      setDenunciasFinalizadas(filteredFinalizadas);
    }
  };

  const handleSearchData = () => {
    const filteredAndamento = allDenunciasAndamento.filter(denuncia =>
      formatDateTime(denuncia.data_denuncia).includes(searchData)
    );
    const filteredFinalizadas = allDenunciasFinalizadas.filter(denuncia =>
      formatDateTime(denuncia.data_denuncia).includes(searchData)
    );
    if (filteredAndamento.length === 0 && filteredFinalizadas.length === 0) {
      setModalMessage('Nenhum resultado encontrado.');
      setModalVisible(true);
    } else {
      setDenunciasAndamento(filteredAndamento);
      setDenunciasFinalizadas(filteredFinalizadas);
    }
  };

  const handleClearSearch = () => {
    setSearchProtocolo('');
    setSearchData('');
    setDenunciasAndamento(allDenunciasAndamento);
    setDenunciasFinalizadas(allDenunciasFinalizadas);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('pt-BR');
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour12: false });
    return `${formattedDate} ${formattedTime}`;
  };

  const formatDataInput = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }
    if (cleaned.length > 8) {
      formatted = formatted.slice(0, 10);
    }
    return formatted;
  };

  const handleDataInputChange = (text) => {
    setSearchData(formatDataInput(text));
  };

  const handleDenunciaPress = (denuncia) => {
    setSelectedDenuncia(denuncia);
    setModalVisible(true);
  };

  const renderDenuncia = (denuncia) => (
    <TouchableOpacity style={styles.denunciaItem} key={denuncia.id} onPress={() => handleDenunciaPress(denuncia)}>
      <Text style={styles.denunciaProtocolo}><Text style={styles.label}>Protocolo:</Text> {denuncia.id}</Text>
      <Text style={styles.denunciaLocal}><Text style={styles.label}>Local:</Text> {denuncia.rua}, {denuncia.numero} - {denuncia.cep}</Text>
      <Text style={styles.denunciaData}><Text style={styles.label}>Data da Denúncia:</Text> {formatDateTime(denuncia.data_denuncia)}</Text>
      <Text style={styles.denunciaData}><Text style={styles.label}>Última Atualização:</Text> {formatDateTime(denuncia.ultima_atualizacao)}</Text>
      <Text style={styles.denunciaStatus}><Text style={styles.label}>Status:</Text> {denuncia.status_descricao}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando denúncias...</Text>
      </View>
    );
  }

  if (allDenunciasAndamento.length === 0 && allDenunciasFinalizadas.length === 0) {
    return (
      <View style={styles.noDenunciasContainer}>
        <Text style={styles.noDenunciasText}>Não há denúncias cadastradas para o usuário.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshDenuncias} />
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>D.A.P.S.</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por protocolo"
          value={searchProtocolo}
          onChangeText={setSearchProtocolo}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchProtocolo}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por data"
          value={searchData}
          onChangeText={handleDataInputChange}
          keyboardType="numeric"
          maxLength={10}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchData}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
        <Text style={styles.clearButtonText}>Limpar Busca</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Denúncias em Andamento</Text>
        {denunciasAndamento.length === 0 ? (
          <Text style={styles.noDenunciasText}>Não há denúncias em andamento.</Text>
        ) : (
          denunciasAndamento.slice(0, visibleAndamento).map(renderDenuncia)
        )}
        {visibleAndamento < denunciasAndamento.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleAndamento(visibleAndamento + 5)}>
            <Text style={styles.loadMoreButtonText}>Mostrar Mais</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Denúncias Finalizadas/Canceladas</Text>
        {denunciasFinalizadas.length === 0 ? (
          <Text style={styles.noDenunciasText}>Não há denúncias finalizadas ou canceladas.</Text>
        ) : (
          denunciasFinalizadas.slice(0, visibleFinalizadas).map(renderDenuncia)
        )}
        {visibleFinalizadas < denunciasFinalizadas.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={() => setVisibleFinalizadas(visibleFinalizadas + 5)}>
            <Text style={styles.loadMoreButtonText}>Mostrar Mais</Text>
          </TouchableOpacity>
        )}
      </View>

      <CustomModal
        visible={modalVisible && !selectedDenuncia}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />

      {selectedDenuncia && (
        <ModalInfoDenuncia
          visible={modalVisible}
          denuncia={selectedDenuncia}
          onClose={() => setModalVisible(false)}
          onRefresh={refreshDenuncias} // Passando a função de refresh como prop
        />
      )}
    </ScrollView>
  );
}