import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export const FooterCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <FontAwesome5 name="heart" size={36} color="white" />
          <Text style={styles.text}>Make more plans with more friends by sharing our quickly evolving app!</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Feather name="upload" size={28} color="white" />
          <Text style={{ fontWeight: '700', fontSize: 18, color: '#fff', marginHorizontal: 5 }}>Share Groupify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 6,
  },
  subContainer: {
    marginTop: 6,
    paddingVertical: 24,
    backgroundColor: '#097969',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
  },
  text: {
    fontSize: 18,
    marginHorizontal: 8,
    color: 'white',
    fontWeight: '600',
    paddingVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31A59F',
    marginHorizontal: 18,
    borderRadius: 8,
    paddingVertical: 10,
  },
});
