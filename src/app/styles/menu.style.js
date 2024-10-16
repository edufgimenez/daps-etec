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
    width: wp('50%'),
    height: hp('25%'),
    marginVertical: hp('1%'),
    marginTop: hp('2%'),
  },
  menuContainer: {
    alignItems: 'center',
    width: wp('100%'),
    marginTop: hp('2%'), // Aumentar a margem superior para afastar do welcomeText
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('2%'),
    backgroundColor: '#F1A801',
    paddingVertical: hp('1.5%'), // Aumentar o padding vertical
    paddingHorizontal: wp('6%'), // Aumentar o padding horizontal
    marginVertical: hp('1.2%'), // Aumentar a margem vertical
    width: wp('80%'), // Aumentar a largura
  },
  menuText: {
    fontSize: wp('5.5%'), // Aumentar o tamanho da fonte
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('3.5%'), // Aumentar a margem esquerda
  },
  logoText: {
    fontSize: wp('12%'),
    marginTop: hp('1%'),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    marginBottom: hp('0.5%'),
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  logoutButton: {
    position: 'absolute',
    bottom: hp('3%'), // Diminuir a margem inferior
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('55%'), // Aumentar a largura
    paddingVertical: hp('1.2%'), // Aumentar o padding vertical
    backgroundColor: '#d9d9d9',
    borderRadius: wp('2%'),
  },
  logoutText: {
    fontSize: wp('4%'), // Aumentar o tamanho da fonte
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp('2.5%'), // Aumentar a margem esquerda
  },
  welcomeText: {
    fontSize: wp('5%'), // Aumentar o tamanho da fonte
    fontFamily: 'Poppins-SemiBold',
    color: '#F1A801',
    marginTop: hp('2%'), // Adicionar margem superior para afastar do logoText
  },
  lastMenuOption: {
    marginBottom: hp('5%'), // Adicionar margem inferior ao último botão
  },
});

export default styles;