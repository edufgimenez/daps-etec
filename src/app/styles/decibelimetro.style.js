import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: wp('4%'),
      backgroundColor: '#fff',
    },
    logo: {
      width: wp('60%'),
      height: hp('30%'),
      marginVertical: hp('2%'),
      marginTop: hp('3%'),
    },
    title: {
      fontSize: wp('8%'),
      marginBottom: hp('1%'),
      color: '#F1A801',
      fontFamily: 'Poppins-SemiBold',
    },
    decibels: {
      fontSize: wp('8%'),
      marginBottom: hp('2%'),
      color: '#000',
      fontFamily: 'Poppins-SemiBold',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: wp('50%'),
      paddingVertical: hp('1.25%'),
      backgroundColor: '#d9d9d9',
      borderRadius: wp('2%'),
      marginBottom: hp('2%'),
    },
    backButtonText: {
      fontSize: wp('4%'),
      color: '#000',
      fontFamily: 'Poppins-SemiBold',
    },
    infoText: {
      fontSize: wp('4%'),
      color: '#000',
      fontFamily: 'Poppins-Light',
      textAlign: 'center',
      marginTop: hp('2%'),
      marginBottom: hp('2%'), // Adiciona margem inferior
    },
    additionalInfoText: {
      fontSize: wp('4%'),
      color: '#000',
      fontFamily: 'Poppins-Light',
      textAlign: 'center',
      marginTop: hp('2%'),
      marginBottom: hp('4%'), // Adiciona margem inferior
    },
  });

export default styles;