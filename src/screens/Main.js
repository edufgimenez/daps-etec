import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export function Main() {
  const insets = useSafeAreaInsets();

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
      <StatusBar backgroundColor="#000" />
      
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.menuContainer}>
        {/* Opções de Menu */}
        <TouchableOpacity style={styles.menuOption}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E9E9E9', // Mesmo fundo da tela de cadastro
  },
  logo: {
    width: wp('60%'),
    height: hp('30%'),
    marginVertical: hp('3%'),
    marginTop: hp('5%')
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente os itens
    width: wp('80%'),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
  },
  menuText: {
    fontSize: RFValue(18),
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('4%'),
    textAlignVertical: 'center', // Garantir que o texto esteja centralizado verticalmente
  },
});
