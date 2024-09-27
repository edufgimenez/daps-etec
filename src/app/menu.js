import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/menu.style';
import ModalConfirmacao from '../components/Modals/ModalConfirmacao'; // Importação do ModalConfirmacao

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); 

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  if (!fontsLoad) {
    return undefined;
  }
  
  const handleLogout = () => {
    setModalVisible(true); // Abre o modal
  };

  const confirmLogout = async () => {
    setModalVisible(false); // Fecha o modal
    await AsyncStorage.removeItem('userSession');
    router.replace("/");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>D.A.P.S</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuOption} 
          onPress={() => router.navigate('/novadenuncia')}
        >
          <Feather name="file-plus" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Nova Denúncia</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.menuOption}
         onPress={() => router.navigate('/consultadenuncias')}>
          <Feather name="search" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Consultar Denúncias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuOption}>
          <Feather name="bar-chart-2" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Gerar Relatório</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout na parte inferior */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Feather name="log-out" size={RFValue(20)} color="#000000" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal de Confirmação de Logout */}
      <ModalConfirmacao
        visible={modalVisible}
        message="Tem certeza que deseja sair?"
        onClose={() => setModalVisible(false)}
        onConfirm={confirmLogout}
      />
    </View>
  );
}