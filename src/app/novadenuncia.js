import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, FlatList, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import styles from './styles/novadenuncia.style';
import { HERE_API_KEY } from '@env';

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
  const [cidadeEstado, setCidadeEstado] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  if (!fontsLoad) {
    return null;
  }

  const fetchAddressData = async (local) => {
    try {
      const response = await fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?at=0,0&q=${local}&apiKey=${HERE_API_KEY}`);
      const data = await response.json();
      setSuggestions(data.items.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocalChange = (text) => {
    setLocal(text);
    if (text.length > 12) {
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
    const cidadeEstadoMatch = label.match(/,\s*([^,]+),\s*\d{5}-\d{3}/);
    const bairroMatch = label.match(/,\s*([^,]+),\s*[^,]+,\s*\d{5}-\d{3}/);

    setLocal(label);
    setRua(ruaMatch ? ruaMatch[0] : '');
    setCep(cepMatch ? cepMatch[0] : '');
    setBairro(bairroMatch ? bairroMatch[1].trim() : '');
    setCidadeEstado(cidadeEstadoMatch ? cidadeEstadoMatch[1].trim() : '');
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
    setCidadeEstado('');
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

  const renderForm = () => (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" backgroundColor={"#fff"} />
      
      {/* Título */}
      <Text style={styles.title}>D.A.P.S.</Text>
      <Text style={styles.subtitle}>Cadastrar Denúncia</Text>

      {/* Campos de texto */}
      <TextInput
        style={styles.input}
        placeholder="Local da ocorrência"
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
        placeholder="Rua"
        placeholderTextColor="#666"
        value={rua}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="CEP"
        placeholderTextColor="#666"
        value={cep}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="Bairro"
        placeholderTextColor="#666"
        value={bairro}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        placeholder="Cidade - Estado"
        placeholderTextColor="#666"
        value={cidadeEstado}
        editable={false}
      />
      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Número"
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
          placeholder="Descreva a ocorrência"
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

      {/* Checkboxes e Botão Limpar Campos */}
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

      {/* Botão Finalizar */}
      <TouchableOpacity style={[styles.button, { marginTop: hp('2%') }]}>
        <Text style={styles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={[{ key: 'form' }]}
        renderItem={renderForm}
        keyExtractor={item => item.key}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </KeyboardAvoidingView>
  );
}