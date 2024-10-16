import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, StyleSheet, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Decibelimetro() {
  const [decibels, setDecibels] = useState(0);
  const [recording, setRecording] = useState(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  useEffect(() => {
    const requestPermissionsAndStartRecording = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar o microfone é necessária!');
      } else {
        await startRecording(); // Aguarda para garantir que o start funcione corretamente
      }
    };
    requestPermissionsAndStartRecording();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBackPress();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        stopRecording(); // Parar a gravação ao sair da tela
      };
    }, [recording])
  );

  const startRecording = async () => {
    // Verifica se há alguma gravação ativa
    if (recording) {
      await stopRecording(); // Garante que a gravação anterior pare antes de iniciar uma nova
    }

    try {
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);

      newRecording.setOnRecordingStatusUpdate((status) => {
        if (status.metering) {
          setDecibels(status.metering); // Atualiza os decibéis com o valor do metering
        }
      });
    } catch (error) {
      console.error('Erro ao iniciar a gravação:', error);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      const status = await recording.getStatusAsync();
      if (status.isRecording) {
        try {
          await recording.stopAndUnloadAsync(); // Garante que a gravação seja descarregada corretamente
        } catch (error) {
          console.error('Erro ao parar a gravação:', error);
        } finally {
          setRecording(null); // Limpa o estado da gravação
        }
      } else {
        //console.log('A gravação já foi descarregada.');
      }
    }
  };

  const handleBackPress = async () => {
    await stopRecording(); // Para a gravação ao voltar
    router.back(); // Volta para a tela anterior
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Decibelímetro</Text>
      <Text style={styles.decibels}>{decibels.toFixed(2)} dB</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        O decibelímetro mede o nível de pressão sonora em decibéis (dB). Utilize este aplicativo para monitorar o nível de ruído no ambiente.
      </Text>
      <Text style={styles.additionalInfoText}>
        Níveis de ruído aceitáveis:
        {'\n'}- Até 50 dB: Silencioso
        {'\n'}- 50 a 70 dB: Moderado
        {'\n'}- Acima de 70 dB: Alto
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
    backgroundColor: '#fff',
  },
  logo: {
    width: wp('60%'),
    height: hp('30%'),
    marginVertical: hp('2%'),
    marginTop: hp('3%'),
  },
  title: {
    fontSize: wp('8%'),
    marginBottom: hp('1%'),
    color: '#F1A801',
    fontFamily: 'Poppins-SemiBold',
  },
  decibels: {
    fontSize: wp('8%'),
    marginBottom: hp('2%'),
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    paddingVertical: hp('1.25%'),
    backgroundColor: '#d9d9d9',
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  backButtonText: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  infoText: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'), // Adiciona margem inferior
  },
  additionalInfoText: {
    fontSize: wp('4%'),
    color: '#000',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('4%'), // Adiciona margem inferior
  },
});