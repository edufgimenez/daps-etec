import React, { useState, useRef } from 'react';
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
import * as Crypto from 'expo-crypto';
import * as Animatable from 'react-native-animatable';

export default function SignUp() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

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
    telefone: '',
    senha: '',
    confirmeSenha: '',
  });

  const inputRefs = {
    nome: useRef(null),
    sobrenome: useRef(null),
    cpf: useRef(null),
    dataNascimento: useRef(null),
    email: useRef(null),
    telefone: useRef(null),
    senha: useRef(null),
  };

  const animatableRefs = {
    nome: useRef(null),
    sobrenome: useRef(null),
    cpf: useRef(null),
    dataNascimento: useRef(null),
    email: useRef(null),
    telefone: useRef(null),
    senha: useRef(null),
  };

  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  if (!fontsLoad) {
    return null;
  }

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .slice(0, 11) // Limita a 11 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto entre o sexto e o sétimo dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona um traço entre o nono e o décimo dígitos
  };

  const formatDate = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .slice(0, 8) // Limita a 8 dígitos
      .replace(/(\d{2})(\d)/, '$1/$2') // Adiciona uma barra entre o segundo e o terceiro dígitos
      .replace(/(\d{2})(\d)/, '$1/$2'); // Adiciona uma barra entre o quarto e o quinto dígitos
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .slice(0, 11) // Limita a 11 dígitos
      .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses e espaço após o DDD
      .replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona um traço após o quinto dígito
  };

  const validateCPF = (cpf) => {
    const unformattedCpf = cpf.replace(/\D/g, '');
    return unformattedCpf.length === 11;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const unformattedPhone = phone.replace(/\D/g, '');
    return unformattedPhone.length === 11;
  };

  const validateDate = (date) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    return dateRegex.test(date);
  };

  const validatePassword = (password) => {
    const rules = {
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 8,
    };
    setPasswordRules(rules);
    return Object.values(rules).every(Boolean);
  };

  const handleSignUp = async () => {
    const { nome, sobrenome, cpf, dataNascimento, email, telefone, senha } = formData;

    if (!nome || !sobrenome || !cpf || !dataNascimento || !email || !telefone || !senha) {
      setModalMessage('Todos os campos são obrigatórios.');
      setModalVisible(true);
      return;
    }

    if (!validateCPF(cpf)) {
      setModalMessage('Por favor, insira um CPF válido.');
      setModalVisible(true);
      shakeAndFocusField('cpf');
      return;
    }

    if (!validateDate(dataNascimento)) {
      setModalMessage('Por favor, insira uma data de nascimento válida.');
      setModalVisible(true);
      shakeAndFocusField('dataNascimento');
      return;
    }

    if (!validateEmail(email)) {
      setModalMessage('Por favor, insira um email válido.');
      setModalVisible(true);
      shakeAndFocusField('email');
      return;
    }

    if (!validatePhone(telefone)) {
      setModalMessage('Por favor, insira um celular válido.');
      setModalVisible(true);
      shakeAndFocusField('telefone');
      return;
    }

    if (!validatePassword(senha)) {
      setModalMessage('A senha não atende aos requisitos.');
      setModalVisible(true);
      shakeAndFocusField('senha');
      return;
    }

    const [day, month, year] = dataNascimento.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    // Verificar se o CPF já existe no banco
    const { data: existingUser, error } = await supabase
      .from('usuarios')
      .select('cpf')
      .eq('cpf', cpf.replace(/\D/g, ''))
      .single();

    if (existingUser) {
      setModalMessage('Usuário já cadastrado com este CPF.');
      setModalVisible(true);
      shakeAndFocusField('cpf');
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
        cpf: cpf.replace(/\D/g, ''),
        data_nascimento: formattedDate,
        email,
        telefone: telefone.replace(/\D/g, ''),
        senha: hashedPassword
      }]);

    if (insertError) {
      console.log(insertError);
      setModalMessage('Erro ao cadastrar usuário.');
      setModalVisible(true);
      return;
    }

    setModalMessage('Usuário cadastrado com sucesso.');
    setIsSignUpSuccess(true);
    setModalVisible(true);
  };

  const shakeAndFocusField = (field) => {
    animatableRefs[field].current.shake(800);
    inputRefs[field].current.focus();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSignUpSuccess) {
      router.replace('/'); // Navegar para a tela de login
    } else {
      const fieldWithError = Object.keys(formData).find(field => {
        if (field === 'cpf' && !validateCPF(formData[field])) return true;
        if (field === 'dataNascimento' && !validateDate(formData[field])) return true;
        if (field === 'email' && !validateEmail(formData[field])) return true;
        if (field === 'telefone' && !validatePhone(formData[field])) return true;
        if (field === 'senha' && !validatePassword(formData[field])) return true;
        return !formData[field];
      });
      if (fieldWithError) {
        shakeAndFocusField(fieldWithError);
      }
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
            { name: 'user', placeholder: 'Nome*', keyboardType: 'default', field: 'nome' },
            { name: 'user', placeholder: 'Sobrenome*', keyboardType: 'default', field: 'sobrenome' },
            { name: 'file-text', placeholder: 'CPF*', keyboardType: 'numeric', field: 'cpf', format: formatCPF },
            { name: 'calendar', placeholder: 'Data Nascimento*', keyboardType: 'numeric', field: 'dataNascimento', format: formatDate },
            { name: 'at-sign', placeholder: 'Email*', keyboardType: 'email-address', field: 'email' },
            { name: 'smartphone', placeholder: 'Celular*', keyboardType: 'phone-pad', field: 'telefone', format: formatPhone },
            { name: 'lock', placeholder: 'Senha*', keyboardType: 'default', secureTextEntry: !showPassword, field: 'senha', isPassword: true },
          ].map((field, index) => (
            <Animatable.View key={index} ref={animatableRefs[field.field]} style={[styles.inputContainer, { marginTop: index === 0 ? hp('1%') : hp('1.7%') }]}>
              <Feather name={field.name} size={RFValue(33)} color="#000000" style={styles.icon} />
              <TextInput
                ref={inputRefs[field.field]}
                style={styles.input}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                secureTextEntry={field.secureTextEntry}
                onChangeText={(value) => {
                  const formattedValue = field.format ? field.format(value) : value;
                  handleInputChange(field.field, formattedValue);
                  if (field.field === 'senha') validatePassword(formattedValue);
                }}
                value={formData[field.field]}
              />
              {field.isPassword && (
                <TouchableOpacity style={styles.eyeIconContainer} onPress={() => field.field === 'senha' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}>
                  <Feather name={(field.field === 'senha' ? showPassword : showConfirmPassword) ? 'eye-off' : 'eye'} size={RFValue(20)} color="#000000" />
                </TouchableOpacity>
              )}
            </Animatable.View>
          ))}

          {/* Regras de senha */}
          {formData.senha && (
            <View style={styles.passwordRulesContainer}>
              <Text style={[styles.passwordRule, passwordRules.hasUpperCase ? styles.passwordRuleValid : styles.passwordRuleInvalid]}>
                {passwordRules.hasUpperCase ? '✔' : '✘'} Pelo menos uma letra maiúscula
              </Text>
              <Text style={[styles.passwordRule, passwordRules.hasNumber ? styles.passwordRuleValid : styles.passwordRuleInvalid]}>
                {passwordRules.hasNumber ? '✔' : '✘'} Pelo menos um número
              </Text>
              <Text style={[styles.passwordRule, passwordRules.hasSpecialChar ? styles.passwordRuleValid : styles.passwordRuleInvalid]}>
                {passwordRules.hasSpecialChar ? '✔' : '✘'} Pelo menos um caractere especial
              </Text>
              <Text style={[styles.passwordRule, passwordRules.hasMinLength ? styles.passwordRuleValid : styles.passwordRuleInvalid]}>
                {passwordRules.hasMinLength ? '✔' : '✘'} Pelo menos 8 caracteres
              </Text>
            </View>
          )}

          {/* Botão Cadastrar */}
          <TouchableOpacity style={styles.buttonSignUp} onPress={handleSignUp}>
            <Text style={styles.buttonSignUpText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}