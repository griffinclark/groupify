import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TEAL } from '../res/styles/Colors';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  destination: string;
}

export const ViewAll: React.FC<Props> = ({ navigation, destination }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(destination, {})}>
      <Text style={styles.text}>SEE ALL</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    color: TEAL,
  },
});
