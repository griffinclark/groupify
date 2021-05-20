// Author: Griffin Clark
// Init date: 1/21/2021
// Last updated: 1/21/2021

// FIXME @Griffin implement subtitles

import { StyleSheet } from 'react-native';
import { LIGHT } from 'res/styles/Colors';

export const globalStyles = StyleSheet.create({
  defaultRootContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: LIGHT,
    flexDirection: 'column',
    padding: 5,
  },
  navbar_container: {
    // whenever you create a navbar, put it one of these
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
