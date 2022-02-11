import { StyleSheet, Dimensions } from 'react-native';
import { LIGHT, TEAL_0, WHITE, BLACK } from './Colors';
import { JOST } from './Fonts';
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
  fieldContainer: {
    backgroundColor: WHITE,
    borderRadius: 4,
    padding: 10,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.3,
    elevation: 13,
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
    paddingLeft: 15,
    fontSize: 30,
    color: TEAL_0,
    textTransform: 'capitalize',
  },
  topBlockBack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    textTransform: 'capitalize',
    marginTop: 0,
    fontFamily: JOST[600],
    lineHeight: 23,
  },
  modalView: {
    width: Dimensions.get("screen").width * 0.85, 
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'flex-end',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8.3,
    elevation: 13,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodySmall: {
    fontSize: 12,
    fontFamily: JOST['400'],
    lineHeight: 18,
  },
  bodyMedium: {
    fontSize: 16,
    fontFamily: JOST['400'],
    lineHeight: 24,
  },
  textH3: {
    fontSize: 16,
    fontFamily: JOST['500'],
    lineHeight: 24,
  },
  dropShadow: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  }
});
