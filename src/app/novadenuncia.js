import React, { useState } from 'react';
import {  Text,  View,  TextInput,  TouchableOpacity, StatusBar} from 'react-native';
import { useFonts } from 'expo-font';
import {  widthPercentageToDP as wp,  heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import styles from './styles/novadenuncia.style';

export default function NovaDenuncia() {
  const insets = useSafeAreaInsets();

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  const [checked, setChecked] = useState({
    armed: false,
    anonymous: false,
  });

  const [description, setDescription] = useState('');

  if (!fontsLoad) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      
      {/* Título */}
      <Text style={styles.title}>D.A.P.S.</Text>
      <Text style={styles.subtitle}>Cadastrar Denúncia</Text>

      {/* Campos de texto */}
      <TextInput
        style={styles.input}
        placeholder="Local"
        placeholderTextColor="#666"
      />
      <View style={styles.textAreaContainer}>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva a ocorrência"
          placeholderTextColor="#666"
          multiline={true}
          maxLength={300}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Text style={styles.charCount}>
          {description.length}/300
        </Text>
      </View>

      {/* Checkboxes */}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxItem}>
          <CheckBox
            value={checked.armed}
            onValueChange={(newValue) => setChecked({ ...checked, armed: newValue })}
          />
          <Text style={styles.checkboxLabel}>Tem alguém armado</Text>
        </View>
        <View style={styles.checkboxItem}>
          <CheckBox
            value={checked.anonymous}
            onValueChange={(newValue) => setChecked({ ...checked, anonymous: newValue })}
          />
          <Text style={styles.checkboxLabel}>Denúncia anônima</Text>
        </View>
      </View>

      {/* Botões */}
      <TouchableOpacity style={[styles.button, { marginTop: hp('2%') }]}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}
