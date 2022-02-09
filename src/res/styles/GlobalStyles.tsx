import { StyleSheet } from 'react-native';
import { GREY_6, LIGHT, TEAL_0, GREY_5, GREY_4, GREY_2, GREY_1 } from './Colors';
import Constants from 'expo-constants';

export const globalStyles = StyleSheet.create({
  defaultRootContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: LIGHT,
    flexDirection: 'column',
  },
  containerWithHeader: {
    paddingTop: Constants.statusBarHeight + 25,
  },
  containerWithFooter: {
    paddingBottom: 80,
  },
  navbar_container: {
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  defaultRowContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  defaultColumnContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  centerViewContainer: {
    alignSelf: 'center',
  },
  spacer: {
    height: 75,
  },
  megaSpacer: {
    height: 250,
  },
  miniSpacer: {
    height: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  superTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  navTitle: {
    // paddingLeft: 15,
    fontSize: 16,
    color: GREY_1,
    paddingTop: 10,
    paddingBottom: 10,
    // textTransform: 'capitalize',
  },
  topBlockBack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: GREY_6,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
    marginTop: 30,
  },
});
