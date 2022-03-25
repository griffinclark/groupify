import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { JOST } from '../res/styles/Fonts';
import { LinearGradient } from 'expo-linear-gradient';

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
    <>
      {selected ? (
        <TouchableOpacity
          onPress={handlePress}
          style={{
            borderWidth: 2,
            borderRadius: 15,
            marginHorizontal: 8,
            marginVertical: 10,
            borderColor: '#DBDBDB',
          }}
        >
          <LinearGradient
            style={{ borderRadius: 15 }}
            colors={['#31A59F', '#006862']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handlePress}
          style={{
            backgroundColor: selected ? '#31A59F' : '#fff',
            borderWidth: 2,
            borderRadius: 15,
            marginHorizontal: 8,
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
      )}
    </>
  );
};
