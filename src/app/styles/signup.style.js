import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#E9E9E9',
    },
    logoText: {
      fontSize: RFValue(38), // Diminui o tamanho da fonte do logo
      marginTop: hp('0.5%'),
      fontFamily: 'AtkinsonHyperlegible-Bold',
      marginBottom: hp('1.2%'), // Diminui o espaçamento inferior
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 4,
    },
    subtitle: {
      fontSize: RFValue(14), // Diminui o tamanho da fonte do subtítulo
      fontFamily: 'Poppins-Light',
      marginBottom: hp('1%'), // Diminui o espaçamento inferior
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: wp('6%'),
      marginBottom: hp('0.5%'),
      position: 'relative', // Adicione esta linha
    },    
    icon: {
      marginRight: wp('2%'),
    },
    input: {
      flex: 1,
      fontSize: RFValue(14), // Diminui o tamanho da fonte do input
      fontFamily: 'Poppins-Light',
      borderBottomWidth: 1,
      borderBottomColor: '#A7A7A7',
    },
    buttonSignUp: {
      marginTop: hp('4%'), // Diminui o espaçamento superior
      borderRadius: 20,
      backgroundColor: '#F1A801',
      paddingVertical: hp('1.25%'), // Diminui o padding vertical
      alignItems: 'center',
      justifyContent: 'center',
      width: wp('80%'),
      marginBottom: hp('2%'), // Diminui o espaçamento inferior
    },
    buttonSignUpText: {
      fontSize: RFValue(18), // Diminui o tamanho da fonte do botão
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
    fontSize: RFValue(12),
    marginTop: hp('0.5%'),
    fontFamily: 'Poppins-Light',
  },
    
    
  });
  
  export default styles;