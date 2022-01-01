/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const NoPlansCard = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <MaterialIcons name="celebration" size={50} color="green" />
        <Text style={styles.text}>No Plans to see here, yet!</Text>
      </View>

      <TouchableOpacity activeOpacity={0.4} style={styles.button}>
        <Text style={styles.buttonText}>Create a Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 5,
    paddingBottom: 8,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 22,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#31A59F',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 22,
  },
});
