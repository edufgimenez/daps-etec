import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StatusBar,
  } from 'react-native';
  import { Feather } from '@expo/vector-icons';
  import { useFonts } from 'expo-font';
  import { RFValue } from 'react-native-responsive-fontsize';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import styles from './styles/signup.style';
  
  export default function SignUp() {
    const insets = useSafeAreaInsets();
  
    const [fontsLoad] = useFonts({
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
    });
  
    if (!fontsLoad) {
      return undefined;
    }
  
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar backgroundColor="#000" />
        <Text style={styles.logoText}>D.A.P.S</Text>
        <Text style={styles.subtitle}>Cadastro de novo usuário</Text>
  
        {/* Campos de entrada */}
        {[
          { name: 'user', placeholder: 'Nome Completo', keyboardType: 'default' },
          { name: 'file-text', placeholder: 'CPF', keyboardType: 'numeric' },
          { name: 'calendar', placeholder: 'Data Nascimento', keyboardType: 'numeric' },
          { name: 'at-sign', placeholder: 'Email', keyboardType: 'email-address' },
          { name: 'at-sign', placeholder: 'Confirme Email', keyboardType: 'email-address' },
          { name: 'smartphone', placeholder: 'Celular', keyboardType: 'phone-pad' },
          { name: 'lock', placeholder: 'Senha', keyboardType: 'default', secureTextEntry: true },
          { name: 'lock', placeholder: 'Confirme Senha', keyboardType: 'default', secureTextEntry: true },
        ].map((field, index) => (
          <View key={index} style={[styles.inputContainer, { marginTop: index === 0 ? hp('1%') : hp('1.7%') }]}> 
            <Feather name={field.name} size={RFValue(33)} color="#000000" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
            />
          </View>
        ))}
  
        {/* Botão Cadastrar */}
        <TouchableOpacity style={styles.buttonLogin}>
          <Text style={styles.buttonLoginText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  