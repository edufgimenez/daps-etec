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
    fontSize: RFValue(42), // Diminui o tamanho da fonte do logo
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
    fontSize: RFValue(18),
    //fontWeight: 'bold',
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
    //fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: RFValue(13),
  },
  denunciaProtocolo: {
    fontSize: RFValue(14),
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  denunciaLocal: {
    fontSize: RFValue(14),
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  denunciaStatus: {
    fontSize: RFValue(14),
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  denunciaData: {
    fontSize: RFValue(13),
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: RFValue(18),
  },
  noDenunciasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDenunciasText: {
    fontSize: RFValue(16),
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
    //fontWeight: 'bold',
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
    //fontSize: RFValue(14),
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
     //fontWeight: 'bold',
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
    //fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  tipText: {
    fontSize: RFValue(14),
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