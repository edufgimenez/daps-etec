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
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
  },
  denunciaItem: {
    padding: hp('1.5%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp('2%'),
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
  },
  denunciaProtocolo: {
    fontSize: RFValue(14),
    color: '#888',
    marginBottom: hp('0.5%'),
  },
  denunciaLocal: {
    fontSize: RFValue(14),
    marginBottom: hp('0.5%'),
  },
  denunciaStatus: {
    fontSize: RFValue(14),
    color: '#555',
    marginBottom: hp('0.5%'),
  },
  denunciaData: {
    fontSize: RFValue(12),
    color: '#888',
    marginBottom: hp('0.5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: RFValue(16),
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
});

export default styles;