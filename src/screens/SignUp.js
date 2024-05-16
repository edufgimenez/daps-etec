import {
  StyleSheet,
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

export function SignUp() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  logoText: {
    fontSize: RFValue(38), // Diminui o tamanho da fonte do logo
    marginTop: hp('3%'),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: hp('1.5%'), // Diminui o espaçamento inferior
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: RFValue(14), // Diminui o tamanho da fonte do subtítulo
    fontFamily: 'Poppins-Light',
    marginBottom: hp('1%'), // Diminui o espaçamento inferior
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('6%'),
    marginBottom: hp('0.5%'), // Diminui o padding inferior
  },
  icon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontSize: RFValue(14), // Diminui o tamanho da fonte do input
    fontFamily: 'Poppins-Light',
    borderBottomWidth: 1,
    borderBottomColor: '#A7A7A7',
  },
  buttonLogin: {
    marginTop: hp('4%'), // Diminui o espaçamento superior
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1%'), // Diminui o padding vertical
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('80%'),
    marginBottom: hp('2%'), // Diminui o espaçamento inferior
  },
  buttonLoginText: {
    fontSize: RFValue(18), // Diminui o tamanho da fonte do botão
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
});
