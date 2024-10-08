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
    fontSize: wp('10%'), // Ajusta o tamanho da fonte do título
    fontFamily: 'AtkinsonHyperlegible-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: wp('6%'), // Ajusta o tamanho da fonte do subtítulo
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp('2%'),
  },
  input: {
    width: wp('90%'),
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('1%'), // Ajusta a borda arredondada para ser relativa
    paddingHorizontal: wp('2%'),
    marginBottom: hp('1.5%'),
    fontFamily: 'Poppins-Light',
    color: '#000',
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do input
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    fontFamily: 'Poppins-Light',
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do input somente leitura
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
    fontSize: wp('3%'), // Ajusta o tamanho da fonte do contador de caracteres
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
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do rótulo do checkbox
  },
  button: {
    marginTop: hp('2%'),
    marginBottom: hp('0.5%'),
    borderRadius: wp('2%'), // Ajusta a borda arredondada para ser relativa
    backgroundColor: '#F1A801',
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('75%'),
  },
  buttonText: {
    fontSize: wp('6%'), // Ajusta o tamanho da fonte do texto do botão
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  clearButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: wp('1%'), // Ajusta a borda arredondada para ser relativa
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do texto do botão limpar
    color: '#000',
    fontFamily: 'Poppins-Light',
  },
  suggestionsContainer: {
    width: wp('90%'),
    height: 'auto',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('1%'), // Ajusta a borda arredondada para ser relativa
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: wp('2%'),
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#000',
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do item de sugestão
  },
});

export default styles;