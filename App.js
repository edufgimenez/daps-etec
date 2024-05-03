import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons' 

export default function App() {
  return (
    <View style={styles.container}>
      <Image
      source={require("./src/assets/logo.png")}
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

      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.buttonLoginText}>Acessar</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 24,fontSize: 14,fontWeight: 'regular',}}>OU</Text>

      <View style={[styles.signUpContainer, {marginTop: 24}]}>
        <Text style={styles.signUpText}>Ainda não possui uma conta? </Text>
        <TouchableOpacity>
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
    height: 224,
    width: 224,    
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 24,
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
  },
  buttonForget: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginHorizontal: 24
  },
  buttonForgetText: {
    fontSize: 12,
    fontWeight: 'light',
  },
  buttonLogin: {
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: '#F1A801',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  buttonLoginText: {
    fontSize: 24,
    color: '#FFFFFF'
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 'light',
  },
  signUpLinkText: {
    textDecorationLine: 'underline'
  }
});
