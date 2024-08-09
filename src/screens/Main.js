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
import TabRoutes from '../routes/tab.routes';

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

      {/* Botões */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Nova Denúncia</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { marginTop: hp('3%') }]}>
        <Text style={styles.buttonText}>Consultar Denúncias</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: hp('3%') }]}>
        <Text style={styles.buttonText}>Denúncia em Andamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: hp('3%') }]}>
        <Text style={styles.buttonText}>Denúncia Finalizada</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: hp('3%') }]}>
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E9E9E9', // Mesmo fundo da tela de cadastro
  },
  logoText: {
    fontSize: RFValue(38),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    color: '#FFFFFF',
    marginTop: hp('3%'),
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logo: {
    width: wp('60%'),
    height: hp('30%'),
    marginVertical: hp('3%'),
    marginTop: hp('6%'),
    marginBottom: hp('6%')
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('70%')
  },
  buttonText: {
    fontSize: RFValue(18),
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
});
