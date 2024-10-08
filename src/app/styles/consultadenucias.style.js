import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2.5%'),
  },
  title: {
    fontSize: wp('10%'), // Ajusta o tamanho da fonte do título
    fontFamily: 'AtkinsonHyperlegible-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  section: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'), // Ajusta o tamanho da fonte do título da seção
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp('0.5%'),
  },
  denunciaItem: {
    padding: hp('1.5%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('2%'),
    marginBottom: hp('0.7%'),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'),
    elevation: 2,
  },
  label: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('3.5%'), // Ajusta o tamanho da fonte do rótulo
  },
  denunciaProtocolo: {
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do protocolo da denúncia
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  denunciaLocal: {
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do local da denúncia
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  denunciaStatus: {
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do status da denúncia
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  denunciaData: {
    fontSize: wp('3.5%'), // Ajusta o tamanho da fonte da data da denúncia
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: wp('5%'), // Ajusta o tamanho da fonte do texto de carregamento
  },
  noDenunciasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDenunciasText: {
    fontSize: wp('4%'), // Ajusta o tamanho da fonte do texto de "sem denúncias"
    color: '#888',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  searchInput: {
    flex: 1,
    height: hp('4.5%'),
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: wp('2%'),
    paddingHorizontal: wp('2.5%'),
    borderRadius: wp('1.5%'),
  },
  searchButton: {
    backgroundColor: '#F1A801',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('1.5%'),
  },
  searchButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  clearButton: {
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },
  clearButtonText: {
    color: '#555',
    fontFamily: 'Poppins-Light',
    textDecorationLine: 'underline',
    fontSize: wp('3.5%'), // Ajusta o tamanho da fonte do texto do botão limpar
  },
  loadMoreButton: {
    alignSelf: 'center',
    marginVertical: hp('1%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#F1A801',
    borderRadius: wp('1.5%'),
  },
  loadMoreButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  backButton: {
    marginTop: hp('2.5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#F1A801',
    borderRadius: wp('1.5%'),
  },
  backButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  tipText: {
    fontSize: wp('3.6%'), // Ajusta o tamanho da fonte do texto de dica
    color: '#888',
    marginBottom: hp('1%'),
    textAlign: 'left',
  },
  statusCancelado: {
    color: 'red',
  },
  statusFinalizada: {
    color: 'green',
  },
  statusDefault: {
    color: '#000',
  },
});

export default styles;