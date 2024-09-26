import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure container takes full height
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: wp('6%'),
  },
  title: {
    fontSize: hp('4%'),
    fontFamily: 'AtkinsonHyperlegible-Bold',
    //marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp('2%'),
  },
  input: {
    width: wp('90%'),
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: wp('2%'),
    marginBottom: hp('1.5%'),
    fontFamily: 'Poppins-Light',
    color: '#000',
    fontSize: RFValue(14),
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    fontFamily: 'Poppins-Light',
    fontSize: RFValue(14),
  },
  textAreaContainer: {
    width: wp('90%'),
    borderColor: '#ccc',
    marginBottom: hp('0.5%'),
    position: 'relative',
  },
  textArea: {
    height: hp('8%'),
    textAlignVertical: 'top',
    padding: wp('1.5%'),
  },
  charCount: {
    position: 'absolute',
    bottom: wp('2%'),
    right: wp('2%'),
    fontFamily: 'Poppins-Light',
    color: '#666',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginBottom: hp('2%'),
  },
  smallInput: {
    width: wp('40%'),
  },
  checkboxAndClearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginBottom: hp('1%'),
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontFamily: 'Poppins-Light',
    marginLeft: wp('2%'),
    fontSize: RFValue(14),
  },
  button: {
    marginTop: hp('2%'),
    marginBottom: hp('0.5%'),
    borderRadius: 8,
    backgroundColor: '#F1A801',
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('75%'),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  clearButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: RFValue(14),
    color: '#000',
    fontFamily: 'Poppins-Light',
  },
  suggestionsContainer: {
    width: wp('90%'),
    height: 'auto',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: wp('2%'),
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#000',
  },
});

export default styles;