import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    StatusBar } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useFonts } from 'expo-font'  
import { useState } from 'react'

export function SignUp() {
  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf')
  })

  if(!fontsLoad) {
    return undefined;
  }
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000' />
      <Text style={styles.logoText}>D.A.P.S</Text>
      <Text style={{marginTop: 8,fontSize: 12, fontFamily: "Poppins-Light"}}>Cadastro de novo usuário</Text>
      
      {/* Campo de entrada de CPF */}
      <View style={styles.inputContainer}>
      <Feather name="user" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Nome Completo'
          keyboardType='default'
        />
      </View>

      {/* Campo de entrada de senha */}
      <View style={[styles.inputContainer, {marginTop: 24}]}>
        <Feather name="file-text" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='CPF'
          keyboardType='numeric'
        />        
      </View>

      <View style={[styles.inputContainer, {marginTop: 24}]}>
      <Feather name="calendar" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Data Nascimento'
          keyboardType='numeric'
        />
      </View>

      <View style={[styles.inputContainer, {marginTop: 24}]}>
      <Feather name="at-sign" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Email'
          keyboardType='default'
        />
      </View>

      <View style={[styles.inputContainer, {marginTop: 24}]}>
      <Feather name="at-sign" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Confirme Email'
          keyboardType='default'
        />
      </View>

      <View style={[styles.inputContainer, {marginTop: 24}]}>
      <Feather name="smartphone" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Celular'
          keyboardType='numeric'
        />
      </View>

      <View style={[styles.inputContainer, {marginTop: 24}]}>
      <Feather name="lock" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Senha'
          keyboardType='default'
          secureTextEntry={true}
        />
      </View>

      <View style={[styles.inputContainer, {marginTop: 24}]}>
      <Feather name="lock" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Confirme Senha'
          keyboardType='default'
          secureTextEntry={true}
        />
      </View>

      
      {/* Botão Acessar */}
      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.buttonLoginText}>Acessar</Text>
      </TouchableOpacity>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E9E9E9",
  },
  logoText: {
    fontSize: 52,
    fontFamily: 'AtkinsonHyperlegible-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Cor da sombra
    textShadowOffset: { width: 0, height: 4 }, // Deslocamento da sombra
    textShadowRadius: 4, // Raio da sombra
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 0,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A7A7',
    paddingVertical: 0,
    fontFamily: "Poppins-Light",
  },
  buttonForget: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginHorizontal: 24
  },
  buttonForgetText: {
    fontSize: 12,
    fontWeight: 'light',
    fontFamily: "Poppins-Light",
  },
  buttonLogin: {
    marginTop: 32,
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 32
  },
  buttonLoginText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: "Poppins-SemiBold",
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 'light',
    fontFamily: "Poppins-Light",
  },
  signUpLinkText: {
    textDecorationLine: 'underline',
    fontFamily: "Poppins-Light",
  }
});
