import { StyleSheet } from 'react-native';
import { LIGHT } from './Colors';

export const globalStyles = StyleSheet.create({
  defaultRootContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: LIGHT,
    flexDirection: 'column',
    padding: 0,
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
});
