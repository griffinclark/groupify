import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { JOST } from '../res/styles/Fonts';

interface Props {
  item: string;
}

export const InterestBox: React.FC<Props> = ({ item }: Props) => {
  const [selected, setSelected] = React.useState(false);
  const handlePress = () => {
    if (!selected) {
      setSelected(true);
    }
    if (selected) {
      setSelected(false);
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: selected ? '#006862' : '#fff',
        borderWidth: 2,
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#DBDBDB',
      }}
    >
      <Text
        style={{
          fontFamily: JOST['400'],
          fontSize: 16,
          lineHeight: 23.12,
          paddingVertical: 4,
          paddingHorizontal: 12,
          color: selected ? '#fff' : '#636363',
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};
