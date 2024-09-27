import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/index.style';
import CustomModal from '../components/Modals/CustomModal.js';
import { supabase } from '../utils/supabase.js';
import * as Crypto from 'expo-crypto'; // Importação do expo-crypto

export default function Login() {
  const insets = useSafeAreaInsets();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigateSignUp = () => {
    router.navigate("./signup");
  };

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  {/* TODO CRIAR REGRAS E MASCARAS NOS CAMPOS CPF E DIGITE SUA SENHA */}   

  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        router.replace("./menu");
      }
    };
    checkUserSession();
  }, []);

  if (!fontsLoad) {
    return undefined;
  }

  const handleLogin = async () => {
    if (!cpf || !senha) {
      setModalMessage('O campo CPF e Senha são obrigatórios!');
      setModalVisible(true);
      return;
    }

    // Busca o hash da senha no banco de dados usando o CPF
    const { data, error } = await supabase
      .from('usuarios')
      .select('senha')
      .eq('cpf', cpf)
      .single();

    if (error || !data) {
      setModalMessage('CPF ou senha inválidos!');
      setModalVisible(true);
      return;
    }

    // Gera o hash da senha digitada para comparação
    const hashedInputPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senha
    );

    // Compara o hash da senha digitada com o hash armazenado
    if (hashedInputPassword === data.senha) {
      // Se as senhas coincidem, o login é bem-sucedido
      await AsyncStorage.setItem('userSession', JSON.stringify({ cpf }));
      router.replace("./menu");
    } else {
      // Senha inválida
      console.log(hashedInputPassword);
      setModalMessage('CPF ou senha inválidos!');
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { paddingTop: hp('1.2%') }]}>
          <StatusBar style="auto" backgroundColor={"#fff"} />
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>D.A.P.S</Text>
          
          <View style={styles.inputContainer}>
            <Feather name="user" size={RFValue(33)} color="#000000" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={setCpf}
              placeholder="Digite seu CPF"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputContainer, { marginTop: hp('3.5%') }]}>
            <Feather name="lock" size={RFValue(33)} color="#000000" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={RFValue(20)} color="#000000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonForget}>
            <Text style={styles.buttonForgetText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
            <Text style={styles.buttonLoginText}>Acessar</Text>
          </TouchableOpacity>

          <Text style={{ marginTop: hp('3.5%'), fontSize: RFValue(14), fontFamily: 'Poppins-Light' }}>
            OU
          </Text>

          <View style={[styles.signUpContainer, { marginTop: hp('3.5%') }]}>
            <Text style={styles.signUpText}>Ainda não possui uma conta? </Text>
            <TouchableOpacity onPress={navigateSignUp}>
              <Text style={styles.signUpLinkText}>Cadastre-se</Text>
            </TouchableOpacity>
            <CustomModal
              visible={modalVisible}
              message={modalMessage}
              onClose={() => setModalVisible(false)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}