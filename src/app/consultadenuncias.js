import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { supabase } from '../utils/supabase'; // Importação do cliente Supabase
import styles from './styles/consultadenucias.style';

export default function ConsultaDenuncias() {
  const [denunciasAndamento, setDenunciasAndamento] = useState([]);
  const [denunciasFinalizadas, setDenunciasFinalizadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDenuncias();
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('pt-BR');
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour12: false });
    return `${formattedDate} ${formattedTime}`;
  };

  const renderDenuncia = ({ item }) => (
    <View style={styles.denunciaItem}>
      <Text style={styles.denunciaProtocolo}><Text style={styles.label}>Protocolo:</Text> {item.id}</Text>
      <Text style={styles.denunciaLocal}><Text style={styles.label}>Local:</Text> {item.rua}, {item.numero} - {item.cep}</Text>
      <Text style={styles.denunciaData}><Text style={styles.label}>Data da Denúncia:</Text> {formatDateTime(item.data_denuncia)}</Text>
      <Text style={styles.denunciaData}><Text style={styles.label}>Última Atualização:</Text> {formatDateTime(item.ultima_atualizacao)}</Text>
      <Text style={styles.denunciaStatus}><Text style={styles.label}>Status:</Text> {item.status_descricao}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando denúncias...</Text>
      </View>
    );
  }

  if (denunciasAndamento.length === 0 && denunciasFinalizadas.length === 0) {
    return (
      <View style={styles.noDenunciasContainer}>
        <Text style={styles.noDenunciasText}>Não há denúncias cadastradas para o usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>D.A.P.S.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Denúncias em Andamento</Text>
        {denunciasAndamento.length === 0 ? (
          <Text style={styles.noDenunciasText}>Não há denúncias em andamento.</Text>
        ) : (
          <FlatList
            data={denunciasAndamento}
            renderItem={renderDenuncia}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Denúncias Finalizadas/Canceladas</Text>
        {denunciasFinalizadas.length === 0 ? (
          <Text style={styles.noDenunciasText}>Não há denúncias finalizadas ou canceladas.</Text>
        ) : (
          <FlatList
            data={denunciasFinalizadas}
            renderItem={renderDenuncia}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
}