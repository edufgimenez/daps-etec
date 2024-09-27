import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles/consultadenucias.style';

export default function ConsultaDenuncias() {
  const [denunciasAndamento, setDenunciasAndamento] = useState([]);
  const [denunciasFinalizadas, setDenunciasFinalizadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui você pode implementar a lógica de busca das denúncias
    setLoading(false); // Apenas para simulação de carregamento
  }, []);

  const renderDenuncia = ({ item }) => (
    <View style={styles.denunciaItem}>
      <Text style={styles.denunciaTitle}>{item.titulo}</Text>
      <Text style={styles.denunciaStatus}>{item.status}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando denúncias...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título e Subtítulo */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>D.A.P.S.</Text>
      </View>

      {/* Denúncias em Andamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Denúncias em Andamento</Text>
        <FlatList
          data={denunciasAndamento}
          renderItem={renderDenuncia}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Denúncias Finalizadas/Canceladas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Denúncias Finalizadas/Canceladas</Text>
        <FlatList
          data={denunciasFinalizadas}
          renderItem={renderDenuncia}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}