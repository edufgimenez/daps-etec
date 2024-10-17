import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginTop: hp('2.5%'),
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
    //alignItems: 'center',
    marginHorizontal: wp('6%'),
    marginBottom: hp('2%'), // Adiciona margem inferior para espaçamento
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
  eyeIconContainer: {
    position: 'absolute',
    right: 0,
    padding: wp('2%'),
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
    borderRadius: wp('2%'), // Ajusta a borda arredondada para ser relativa
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.5%'), // Aumenta o padding vertical para melhor toque
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('75%'),
  },
  buttonLoginText: {
    fontSize: RFValue(24),
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  signUpContainer: {
    flexDirection: 'row', // Corrige a direção do flex para 'row'
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  signUpText: {
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Light',
  },
  signUpLinkText: {
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(14), // Adiciona o tamanho da fonte para consistência
  },
});

export default styles;