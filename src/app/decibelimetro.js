import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles/decibelimetro.style';

export default function Decibelimetro() {
  const [decibels, setDecibels] = useState(0);
  const [decibelReadings, setDecibelReadings] = useState([]);
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
    if (recording) {
      await stopRecording();
    }
  
    try {
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
  
      newRecording.setOnRecordingStatusUpdate((status) => {
        if (status.metering) {
          const MIN_DB = 15;
          const MAX_DB = 130;
          const MIN_METERING = -160;
          const MAX_METERING = 0;
          
          const normalizedDecibels = MIN_DB + ((status.metering - MIN_METERING) / (MAX_METERING - MIN_METERING)) * (MAX_DB - MIN_DB);
  
          setDecibelReadings((prev) => {
            const updatedReadings = [...prev, normalizedDecibels];
            if (updatedReadings.length > 5) updatedReadings.shift(); // Mantém um buffer de 10 leituras
            return updatedReadings;
          });
        }
      });
    } catch (error) {
      console.error('Erro ao iniciar a gravação:', error);
    }
  };
  
  // Calcular a média dos valores de decibéis
  useEffect(() => {
    if (decibelReadings.length > 0) {
      const avgDecibels = decibelReadings.reduce((a, b) => a + b, 0) / decibelReadings.length;
      setDecibels(avgDecibels);
    }
  }, [decibelReadings]);

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
      }
    }
  };

  const handleBackPress = async () => {
    await stopRecording(); // Para a gravação ao voltar
    router.back(); // Volta para a tela anterior
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
    </ScrollView>
  );
}
