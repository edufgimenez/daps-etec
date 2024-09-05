import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Importação do hook useRouter
import styles from './styles/menu.style';

export default function Main() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // Obtenção da instância do roteador

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  if (!fontsLoad) {
    return undefined;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>D.A.P.S</Text>

      <View style={styles.menuContainer}>
        {/* Opções de Menu */}
        <TouchableOpacity 
          style={styles.menuOption} 
          onPress={() => router.navigate('/novadenuncia')} // Navegação para a tela novadenuncia
        >
          <Feather name="file-plus" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Nova Denúncia</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuOption}>
          <Feather name="search" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Consultar Denúncias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuOption}>
          <Feather name="bar-chart-2" size={RFValue(24)} color="#000000" />
          <Text style={styles.menuText}>Gerar Relatório</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}