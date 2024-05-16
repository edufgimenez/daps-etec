import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Login() {
  const navigation = useNavigation();
  //const insets = useSafeAreaInsets();

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const [fontsLoad] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AtkinsonHyperlegible-Bold': require('../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  if (!fontsLoad) {
    return undefined;
  }

  return (
    <View style={[styles.container, { paddingTop: hp('1.2%') }]}>
      <StatusBar backgroundColor="#000" />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.logoText}>D.A.P.S</Text>

      <View style={styles.inputContainer}>
        <Feather name="user" size={RFValue(33)} color="#000000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
        />
      </View>

      <View style={[styles.inputContainer, { marginTop: hp('3.5%') }]}>
        <Feather name="lock" size={RFValue(33)} color="#000000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.buttonForget}>
        <Text style={styles.buttonForgetText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  logo: {
    marginTop: hp('3%'),
    width: wp('60%'),
    height: hp('25%'),
    aspectRatio: 1,
  },
  logoText: {
    fontSize: RFValue(64),
    marginTop: hp('2%'),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: hp('6.5%'),
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('6%'),
  },
  icon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontSize: RFValue(18),
    fontFamily: 'Poppins-Light',
    borderBottomWidth: 1,
    borderBottomColor: '#A7A7A7',
    
  },
  buttonForget: {
    alignSelf: 'flex-end',
    marginTop: hp('1.25%'),
    marginHorizontal: wp('6%'),
  },
  buttonForgetText: {
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Light',
  },
  buttonLogin: {
    marginTop: hp('3%'),
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.25%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('80%'),
  },
  buttonLoginText: {
    fontSize: RFValue(24),
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  signUpContainer: {
    flexDirection: 'grid',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  signUpText: {
    fontSize: RFValue(16),
    fontFamily: 'Poppins-Light',
  },
  signUpLinkText: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Light',
  },
});