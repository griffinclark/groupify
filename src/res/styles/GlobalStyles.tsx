import { StyleSheet } from 'react-native';
import { LIGHT, TEAL } from './Colors';

export const globalStyles = StyleSheet.create({
  defaultRootContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: LIGHT,
    flexDirection: 'column',
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
    flexGrow: 1
  },
  navTitle: {
    paddingLeft: 15,
    fontSize: 30,
    color: TEAL,
    textTransform: 'capitalize'
  },
  topBlockBack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    textTransform: 'capitalize',
    marginTop: 30
}
});
