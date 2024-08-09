import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';

export function NovaDenuncia() {
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Revisar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: hp('2%') }]}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: RFValue(38),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    color: '#000',
    marginTop: hp('5%'),
  },
  subtitle: {
    fontSize: RFValue(24),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: hp('4%'),
  },
  input: {
    width: '100%',
    height: hp('7%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(16),
    backgroundColor: '#fff',
  },
  textAreaContainer: {
    width: '100%',
    position: 'relative',
  },
  textArea: {
    height: hp('15%'),
    textAlignVertical: 'top',
    paddingTop: hp('1%'),
  },
  charCount: {
    position: 'absolute',
    bottom: hp('1%'),
    right: wp('2%'),
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(14),
    color: '#666',
  },
  checkboxContainer: {
    width: '100%',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    marginLeft: wp('3%')
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  checkboxLabel: {
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(16),
    marginLeft: wp('2%'),
    color: '#000',
  },
  button: {
    width: '100%',
    backgroundColor: '#F1A801',
    paddingVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(18),
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
  },
});
