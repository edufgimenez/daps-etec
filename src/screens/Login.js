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
import { useNavigation } from '@react-navigation/native' 
 

export function Login() {

  const navigation = useNavigation();
  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  }
  
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
      <Image
      source={require("../assets/logo.png")}
      style={styles.logo}
      />
      <Text style={styles.logoText}>D.A.P.S</Text>
      
      {/* Campo de entrada de CPF */}
      <View style={styles.inputContainer}>
      <Feather name="user" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Digite seu CPF'
          keyboardType='numeric'
        />
      </View>
      {/* Campo de entrada de senha */}
      <View style={[styles.inputContainer, {marginTop: 24}]}>
        <Feather name="lock" size={33} color="#000000" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder='Digite sua senha'
          secureTextEntry={true}
        />        
      </View>
      
      {/* Botão esqueceu a senha */}
      <TouchableOpacity style={styles.buttonForget}>
        <Text style={styles.buttonForgetText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* Botão Acessar */}
      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.buttonLoginText}>Acessar</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 24,fontSize: 14, fontFamily: "Poppins-Light"}}>OU</Text>

      {/* Botão Cadastre-se */}
      <View style={[styles.signUpContainer, {marginTop: 24}]}>
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
    flexDirection: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E9E9E9",
  },
  logo: {
    marginTop: 12,
    width: '60%',
    height: '32%', 
  },
  logoText: {
    fontSize: 64,
    marginTop: 24,
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: 52,
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
    fontSize: 18,
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
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
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
