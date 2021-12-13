import { ConsoleLogger } from '@aws-amplify/core';
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { refreshConfig } from '../res/firebaseConfig';

export const RefreshConfig = () => {
  const [loading, setLoading] = useState(false);

  const refreshPress = () => {
    console.log('hit');
    setLoading(true);
    refreshConfig()
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  const content = {
    refresh: <Text style={styles.text}>Refresh Values</Text>,
    spinner: <Image source="../../assets/Icons/MapIcon.tsx" style={styles.spinner} resizeMode="contain" />,
  };

  return (
    <TouchableOpacity style={styles.button} onPress={refreshPress} testID="refreshButton">
      {loading ? content.spinner : content.refresh}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 24,
    borderWidth: 2,
    borderColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 172,
    borderRadius: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: 'green',
  },
  spinner: {
    width: 24,
    height: 24,
  },
});
