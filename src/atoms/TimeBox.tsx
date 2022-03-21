import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { JOST } from '../res/styles/Fonts';
import { WHITE } from '../res/styles/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  // onPress: () => void;
  item: string;
  handlePress: (time: any) => void;
  selected: boolean;
}

const Time: React.FC<Props> = ({ handlePress, selected, item }: Props) => (
  <TouchableOpacity
    onPress={handlePress}
    style={{
      borderWidth: 2,
      width: 101,
      height: 31,
      alignItems: 'center',
      borderRadius: 4,
      borderColor: '#DBDBDB',
    }}
  >
    <Text style={{ fontSize: 16, fontFamily: JOST['400'], color: selected ? WHITE : '#636363' }}>{item} AM</Text>
  </TouchableOpacity>
);
export const TimeBox: React.FC<Props> = ({ item }: Props) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    if (!selected) {
      setSelected(true);
    }
    if (selected) {
      setSelected(false);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      {selected ? (
        <LinearGradient
          style={{ borderRadius: 5 }}
          colors={['#31A59F', '#006862']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Time item={item} handlePress={handlePress} selected={selected} />
        </LinearGradient>
      ) : (
        <Time item={item} handlePress={handlePress} selected={selected} />
      )}
    </View>
  );
};
