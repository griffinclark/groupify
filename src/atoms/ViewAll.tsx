import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TEAL_0 } from '../res/styles/Colors';
import { AppText } from './AppText';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  destination: string;
  payload?: Record<string, unknown>;
}

export const ViewAll: React.FC<Props> = ({ navigation, destination, payload }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(destination, payload ? payload : {})}>
      <AppText style={styles.text}>SEE ALL</AppText>
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
    color: TEAL_0,
  },
});
