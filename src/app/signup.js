import React, { useState } from 'react';
import { router } from 'expo-router';
import { Text, View, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles/signup.style';
import { supabase } from '../utils/supabase.js';
import CustomModal from '../components/Modals/CustomModal.js';
import * as Crypto from 'expo-crypto'; // Importação do expo-crypto

export default function SignUp() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    confirmeEmail: '',
    telefone: '',
    senha: '',
    confirmeSenha: '',
  });

  if (!fontsLoad) {
    return null;
  }

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    const { nome, sobrenome, cpf, dataNascimento, email, telefone, senha } = formData;

    if (!nome || !sobrenome || !cpf || !dataNascimento || !email || !telefone || !senha) {
      setModalMessage('Todos os campos são obrigatórios.');
      setModalVisible(true);
      return;
    }

    // Verificar se o CPF já existe no banco
    const { data: existingUser, error } = await supabase
      .from('usuarios')
      .select('cpf')
      .eq('cpf', cpf)
      .single();

    if (existingUser) {
      setModalMessage('Usuário já cadastrado com este CPF.');
      setModalVisible(true);
      return;
    }

    if (error && error.code !== 'PGRST116') {
      setModalMessage('Erro ao verificar CPF.');
      setModalVisible(true);
      return;
    }

    // Hash da senha usando expo-crypto
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senha
    );

    // Inserir novo usuário no banco
    const { data, error: insertError } = await supabase
      .from('usuarios')
      .insert([{
        nome,
        sobrenome,
        cpf,
        data_nascimento: dataNascimento,
        email,
        telefone,
        senha: hashedPassword
      }]);

    if (insertError) {
      setModalMessage('Erro ao cadastrar usuário.');
      setModalVisible(true);
      return;
    }

    setModalMessage('Usuário cadastrado com sucesso.');
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (modalMessage === 'Usuário cadastrado com sucesso.') {
      router.replace('/'); // Substitui a rota atual pela rota de login
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <CustomModal visible={modalVisible} message={modalMessage} onClose={handleCloseModal} />
          <StatusBar style="auto" backgroundColor={"#fff"} />
          <Text style={styles.logoText}>D.A.P.S</Text>
          <Text style={styles.subtitle}>Cadastro de novo usuário</Text>

          {/* Campos de entrada */}
          {[
            { name: 'user', placeholder: 'Nome', keyboardType: 'default', field: 'nome' },
            { name: 'user', placeholder: 'Sobrenome', keyboardType: 'default', field: 'sobrenome' },
            { name: 'file-text', placeholder: 'CPF', keyboardType: 'numeric', field: 'cpf' },
            { name: 'calendar', placeholder: 'Data Nascimento', keyboardType: 'numeric', field: 'dataNascimento' },
            { name: 'at-sign', placeholder: 'Email', keyboardType: 'email-address', field: 'email' },
            { name: 'smartphone', placeholder: 'Celular', keyboardType: 'phone-pad', field: 'telefone' },
            { name: 'lock', placeholder: 'Senha', keyboardType: 'default', secureTextEntry: !showPassword, field: 'senha', isPassword: true },
          ].map((field, index) => (
            <View key={index} style={[styles.inputContainer, { marginTop: index === 0 ? hp('1%') : hp('1.7%') }]}>
              <Feather name={field.name} size={RFValue(33)} color="#000000" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                secureTextEntry={field.secureTextEntry}
                onChangeText={(value) => handleInputChange(field.field, value)}
              />
              {field.isPassword && (
                <TouchableOpacity style={styles.eyeIconContainer} onPress={() => field.field === 'senha' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}>
                  <Feather name={(field.field === 'senha' ? showPassword : showConfirmPassword) ? 'eye-off' : 'eye'} size={RFValue(20)} color="#000000" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Botão Cadastrar */}
          <TouchableOpacity style={styles.buttonSignUp} onPress={handleSignUp}>
            <Text style={styles.buttonSignUpText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
