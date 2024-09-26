import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff', // Mesmo fundo da tela de cadastro
    },
    logo: {
      width: wp('60%'),
      height: hp('30%'),
      marginVertical: hp('3%'),
      marginTop: hp('5%')
    },
    menuContainer: {
      flex: 1,
      justifyContent: 'center', // Centraliza verticalmente os itens
      alignItems: 'center',
      width: wp('100%'),
    },
    menuOption: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#F1A801',
      paddingVertical: hp('1.25%'),
      paddingHorizontal: wp('5%'),
      marginVertical: hp('1.5%'),
      width: wp('75%'),
    },
    menuText: {
      fontSize: RFValue(18),
      color: '#FFFFFF',
      fontFamily: 'Poppins-SemiBold',
      marginLeft: wp('4%'),
      alignItems: 'center',
      //textAlignVertical: 'center', // Garantir que o texto esteja centralizado verticalmente
    },
    logoText: {
      fontSize: RFValue(48),
      marginTop: hp('2%'),
      fontFamily: 'AtkinsonHyperlegible-Bold',
      marginBottom: hp('2.5%'),
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
    },
  });

  export default styles;