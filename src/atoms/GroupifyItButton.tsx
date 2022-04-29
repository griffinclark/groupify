import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../atoms/AtomsExports';
import { JOST } from '../res/styles/Fonts';
import { TEAL_0 } from '../res/styles/Colors';

interface Props {
  onButtonPress: any;
}

export const GroupifyItButton: React.FC<Props> = ({ onButtonPress }: Props) => {
  return (
    <View style={styles.viewMapBtn} onStartShouldSetResponder={onButtonPress}>
      <Button
        buttonStyle={styles.button}
        textStyle={{ fontFamily: JOST[600] }}
        containerStyle={{ width: 'auto' }}
        title={'Groupify It'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: TEAL_0,
    borderRadius: 5,
    justifyContent: 'center',
    maxWidth: 90,
    minWidth: 0,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginVertical: 0,
  },
  viewMapBtn: {
    marginLeft: 'auto',
  },
});
