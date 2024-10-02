import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, FlatList, TouchableHighlight, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import styles from './styles/novadenuncia.style';
import { HERE_API_KEY } from '@env';
import { supabase } from '../utils/supabase.js';
import ModalDenuncia from '../components/Modals/ModalDenuncia.js';
import CustomModal from '../components/Modals/CustomModal.js';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import * as Crypto from 'expo-crypto'; // Importação do expo-crypto

export default function NovaDenuncia() {
  const insets = useSafeAreaInsets();

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  const [checked, setChecked] = useState({
    anonymous: false,
  });

  const [description, setDescription] = useState('');
  const [local, setLocal] = useState('');
  const [rua, setRua] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isModalDenunciaVisible, setModalDenunciaVisible] = useState(false);
  const [isCustomModalVisible, setCustomModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  if (!fontsLoad) {
    return null;
  }

  const generateHash = async (cpf) => {
    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, cpf);
    return hash;
  };

  const validateAddressFormat = (suggestion) => {
    if (!suggestion || !suggestion.address || !suggestion.address.label) {
      return false;
    }
  
    const addressPattern = /^[^,]+, \d+, [^,]+, [^,]+ - [A-Z]{2}, \d{5}-\d{3}, Brasil$/;
  
    return addressPattern.test(suggestion.address.label);
  };
  
  const fetchAddressData = async (local) => {
    try {
      const response = await fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=0,0&q=${local}&apiKey=${HERE_API_KEY}`);
      const data = await response.json();
  
      const filteredSuggestions = Array.isArray(data.items) ? data.items.filter(validateAddressFormat) : [];
  
      setSuggestions(filteredSuggestions.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddressByCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setModalMessage('CEP inválido.');
        setCustomModalVisible(true);
        return;
      }

      const formattedCep = formatCep(cep);

      setRua(data.logradouro);
      setBairro(data.bairro);
      setCidade(data.localidade);
      setEstado(data.uf);
      setCep(formattedCep);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCep = (cep) => {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleLocalChange = (text) => {
    setLocal(text);
    const numericText = text.replace(/[^0-9]/g, '');

    if (numericText.length === 8) {
      fetchAddressByCep(numericText);
    } else if (text.length > 10) {
      fetchAddressData(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (!suggestion || !suggestion.address || !suggestion.address.label) {
      return;
    }

    const label = suggestion.address.label;
    const ruaMatch = label.match(/^[^,]+/);
    const cepMatch = label.match(/\b\d{5}-\d{3}\b/);
    const cidadeEstadoMatch = label.match(/,\s*([^,]+)\s*-\s*([A-Z]{2})\s*,\s*\d{5}-\d{3}/);
    const bairroMatch = label.match(/,\s*([^,]+),\s*[^,]+,\s*\d{5}-\d{3}/);

    setLocal(label);
    setRua(ruaMatch ? ruaMatch[0] : '');
    setCep(cepMatch ? cepMatch[0] : '');
    setBairro(bairroMatch ? bairroMatch[1].trim() : '');
    setCidade(cidadeEstadoMatch ? cidadeEstadoMatch[1].trim() : '');
    setEstado(cidadeEstadoMatch ? cidadeEstadoMatch[2].trim() : '');
    setSuggestions([]);
  };

  const handleClearFields = () => {
    setDescription('');
    setLocal('');
    setRua('');
    setCep('');
    setBairro('');
    setNumero('');
    setComplemento('');
    setCidade('');
    setEstado('');
    setSuggestions([]);
  };

  const handleNumeroChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 8) {
      setNumero(numericText);
    }
  };

  const handleComplementoChange = (text) => {
    if (text.length <= 32) {
      setComplemento(text);
    }
  };

  const handleFinalizarPress = () => {
    if (!description || !rua || !bairro || !cep || !cidade || !estado || !numero) {
      setModalMessage('Por favor, preencha todos os campos obrigatórios.');
      setCustomModalVisible(true);
      return;
    } else {
      setModalDenunciaVisible(true);
    }
  };

  const handleCancelPress = () => {
    setModalDenunciaVisible(false);
    setCustomModalVisible(false);
  };

  const handleCadastrarPress = async () => {
    try {
      const userSession = JSON.parse(await AsyncStorage.getItem('userSession')); // Get userSession from AsyncStorage
      
      const cpfHash = checked.anonymous ? await generateHash(userSession.cpf) : null;

      const denunciaData = {
        descricao: description,
        rua: rua,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        numero: numero,
        complemento: complemento,
        anonimo: checked.anonymous,
        data_denuncia: new Date().toISOString(),
        usuario_cpf: checked.anonymous ? null : userSession.cpf, // Use userSession to get cpf
        cpf_hash: checked.anonymous ? cpfHash : null,
      };

      const { data: denuncia, error: denunciaError } = await supabase
        .from('denuncias')
        .insert([denunciaData])
        .select('id')
        .single();

      if (denunciaError) {
        console.log(denunciaError);
        setModalMessage('Erro ao cadastrar denúncia. Tente novamente.');
        setCustomModalVisible(true);
        return;
      }

      const denunciaId = denuncia.id;

      const { error: statusError } = await supabase
        .from('denuncias_status')
        .insert([{
          denuncia_id: denunciaId,
          status_id: 1,
          data_atualizacao: new Date().toISOString(),
        }]);

      if (statusError) {
        console.log(statusError);
        setModalMessage('Erro ao atualizar status da denúncia. Tente novamente.');
        setCustomModalVisible(true);
        return;
      }

      setModalMessage('Denúncia cadastrada com sucesso!');
      handleClearFields();
      setCustomModalVisible(true);

    } catch (error) {
      console.error('Erro ao cadastrar denúncia:', error);
    } finally {
      setModalDenunciaVisible(false);
    }
  };

  const renderForm = () => (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      
      <Text style={styles.title}>D.A.P.S.</Text>
      <Text style={styles.subtitle}>Cadastrar Denúncia</Text>

      <TextInput
        style={styles.input}
        placeholder="Endereço ou CEP*"
        placeholderTextColor="#666"
        value={local}
        onChangeText={handleLocalChange}
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="#ddd"
                onPress={() => handleSuggestionSelect(item)}
              >
                <Text style={styles.suggestionItem}>{item.address.label}</Text>
              </TouchableHighlight>
            )}
          />
        </View>
      )}
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="Rua*"
        placeholderTextColor="#666"
        value={rua}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="CEP*"
        placeholderTextColor="#666"
        value={cep}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="Bairro*"
        placeholderTextColor="#666"
        value={bairro}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="Cidade - Estado*"
        placeholderTextColor="#666"
        value={cidade && estado ? `${cidade} - ${estado}` : ''}
        editable={false}
      />
      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Número*"
          placeholderTextColor="#666"
          value={numero}
          onChangeText={handleNumeroChange}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Complemento"
          placeholderTextColor="#666"
          value={complemento}
          onChangeText={handleComplementoChange}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva a ocorrência*"
          placeholderTextColor="#666"
          multiline={true}
          maxLength={100}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Text style={styles.charCount}>
          {description.length}/100
        </Text>
      </View>

      <View style={styles.checkboxAndClearContainer}>
        <View style={styles.checkboxItem}>
          <CheckBox
            value={checked.anonymous}
            onValueChange={(newValue) => setChecked({ ...checked, anonymous: newValue })}
          />
          <Text style={styles.checkboxLabel}>Denúncia anônima</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearFields}>
          <Text style={styles.clearButtonText}>Limpar Campos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: hp('2%') }]} onPress={handleFinalizarPress}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <FlatList
        data={[{ key: 'form' }]}
        renderItem={renderForm}
        keyExtractor={item => item.key}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <ModalDenuncia
        visible={isModalDenunciaVisible}
        message="Você tem certeza que deseja cadastrar esta denúncia? Denúncias falsas são ilegais."
        onClose={handleCancelPress}
        onConfirm={handleCadastrarPress}
      />
      <CustomModal
        visible={isCustomModalVisible}
        message={modalMessage}
        onClose={handleCancelPress}
      />
    </KeyboardAvoidingView>
  );
}