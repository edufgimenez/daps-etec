import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ImageBackground,
  } from 'react-native';
  import { Feather } from '@expo/vector-icons';
  import { useFonts } from 'expo-font';
  import { RFValue } from 'react-native-responsive-fontsize';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { router } from 'expo-router';
  import styles from './styles/index.style';
  
  export default function Login() {
    const insets = useSafeAreaInsets();
  
    const navigateSignUp = () => {
      router.navigate("./signup")
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
        <StatusBar style="auto" backgroundColor={"#fff"} />
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
  