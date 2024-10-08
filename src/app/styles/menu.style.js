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
    marginVertical: hp('2%'),
    marginTop: hp('3%'),
  },
  menuContainer: {
    alignItems: 'center',
    width: wp('100%'),
    marginTop: hp('2.5%'),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('2%'), // Ajusta a borda arredondada para ser relativa
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
    width: wp('80%'),
  },
  menuText: {
    fontSize: wp('5%'), // Ajusta o tamanho da fonte do texto do menu
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('3%'),
  },
  logoText: {
    fontSize: wp('15%'), // Ajusta o tamanho da fonte do texto do logo
    marginTop: hp('1.5%'),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: hp('1%'),
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logoutButton: {
    position: 'absolute',
    bottom: hp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    paddingVertical: hp('1.0%'),
    backgroundColor: '#d9d9d9',
    borderRadius: wp('2%'), // Ajusta a borda arredondada para ser relativa
  },
  logoutText: {
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do texto de logout
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('2%'),
  },
  welcomeText: {
    fontSize: wp('5%'), // Ajusta o tamanho da fonte do texto de boas-vindas
    fontFamily: 'Poppins-SemiBold',
    color: '#F1A801',
  },
});

export default styles;