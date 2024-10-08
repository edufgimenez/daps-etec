import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: wp('10%'), // Ajusta o tamanho da fonte do logo
    marginTop: hp('2%'),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: hp('1.2%'), // Diminui o espaçamento inferior
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: wp('6%'), // Ajusta o tamanho da fonte do subtítulo
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp('2%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('6%'),
    marginBottom: hp('0.5%'),
    position: 'relative',
  },
  icon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do input
    fontFamily: 'Poppins-Light',
    borderBottomWidth: 1,
    borderBottomColor: '#A7A7A7',
  },
  buttonSignUp: {
    marginTop: hp('4%'), // Diminui o espaçamento superior
    borderRadius: wp('2%'), // Ajusta a borda arredondada para ser relativa
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.5%'), // Ajusta o padding vertical
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('75%'),
    marginBottom: hp('2%'), // Diminui o espaçamento inferior
  },
  buttonSignUpText: {
    fontSize: wp('6%'), // Ajusta o tamanho da fonte do botão
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 0,
    padding: wp('1%'),
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: wp('3%'), // Ajusta o tamanho da fonte do texto de erro
    marginTop: hp('0.5%'),
    fontFamily: 'Poppins-Light',
  },
  passwordRulesContainer: {
    marginTop: hp('1%'),
    marginHorizontal: wp('6%'),
  },
  passwordRule: {
    fontSize: wp('3%'), // Ajusta o tamanho da fonte das regras de senha
    fontFamily: 'Poppins-Light',
  },
  passwordRuleValid: {
    color: 'green',
  },
  passwordRuleInvalid: {
    color: 'red',
  },
});

export default styles;