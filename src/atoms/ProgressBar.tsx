import React, { FunctionComponent, useEffect } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';
import { GOLD_0, TEAL_0 } from '../res/styles/Colors';

export const ProgressBar: FunctionComponent = () => {
  const startWidth = React.useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('screen');
  const finalWidth = width;

  useEffect(() => {
    // TODO where should I put duartion (ms)? Should this be constant across the whole app?
    //TODO what colors should I use here?
    // This should return a value when finished too
    Animated.timing(startWidth, { toValue: finalWidth, duration: 3000, useNativeDriver: false }).start();
  }, []);
  return (
    <View style={styles.barContainer}>
      <Animated.View style={[styles.progressBar, { width: startWidth }]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: GOLD_0,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    backgroundColor: TEAL_0,
    width: 100,
    height: 5,
  },
});
