import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E9E9E9',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
    },
    title: {
      fontSize: RFValue(38),
      fontFamily: 'AtkinsonHyperlegible-Bold',
      color: '#000',
      marginTop: hp('5%'),
    },
    subtitle: {
      fontSize: RFValue(24),
      fontFamily: 'Poppins-SemiBold',
      color: '#000',
      marginBottom: hp('4%'),
    },
    input: {
      width: '100%',
      height: hp('7%'),
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: wp('3%'),
      marginBottom: hp('2%'),
      fontFamily: 'Poppins-Light',
      fontSize: RFValue(16),
      backgroundColor: '#fff',
    },
    textAreaContainer: {
      width: '100%',
      position: 'relative',
    },
    textArea: {
      height: hp('15%'),
      textAlignVertical: 'top',
      paddingTop: hp('1%'),
    },
    charCount: {
      position: 'absolute',
      bottom: hp('1%'),
      right: wp('2%'),
      fontFamily: 'Poppins-Light',
      fontSize: RFValue(14),
      color: '#666',
    },
    checkboxContainer: {
      width: '100%',
      marginTop: hp('2%'),
      marginBottom: hp('3%'),
      marginLeft: wp('3%')
    },
    checkboxItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp('1.5%'),
    },
    checkboxLabel: {
      fontFamily: 'Poppins-Light',
      fontSize: RFValue(16),
      marginLeft: wp('2%'),
      color: '#000',
    },
    button: {
      width: '75%',
      backgroundColor: '#F1A801',
      paddingVertical: hp('1%'),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: RFValue(24),
      color: '#FFF',
      fontFamily: 'Poppins-SemiBold',
    },
  });
  

  export default styles;