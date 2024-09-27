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
    width: wp('60%'),
    height: hp('30%'),
    marginVertical: hp('2%'), // Reduzi um pouco a margem
    marginTop: hp('3%'), // Subir um pouco o logo
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    marginTop: hp('0.5%'), // Diminui o espaçamento acima dos botões do menu
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('5%'),
    marginVertical: hp('1.25%'), // Reduzi a margem entre os botões
    width: wp('75%'),
  },
  menuText: {
    fontSize: RFValue(18),
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('4%'),
  },
  logoText: {
    fontSize: RFValue(48),
    marginTop: hp('1.5%'), // Subir um pouco o texto "D.A.P.S"
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: hp('1%'), // Diminuir o espaçamento inferior
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logoutButton: {
    position: 'relative',
    bottom: hp('5%'), //
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  logoutText: {
    fontSize: RFValue(16),
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('2%'),
  },
});



  export default styles;