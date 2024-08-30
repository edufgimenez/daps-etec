import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    borderRadius: 8,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1%'),
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

export default styles;