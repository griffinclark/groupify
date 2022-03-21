import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { LinearGradient } from 'expo-linear-gradient';
interface Props {
  //   onPress: () => void;
  item: string;
  selectedDay: string;
  setSelectedDay: (day: any) => void;
  handlePress?: (day: any) => void;
}

const AvailabilityTile: React.FC<Props> = ({ item, selectedDay, handlePress }: Props) => (
  <TouchableOpacity
    onPress={handlePress}
    style={{
      borderRadius: 4,
      width: 48,
      height: 47,
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        lineHeight: 23.12,
        fontSize: 16,
        fontFamily: JOST['400'],
        marginHorizontal: 8,
        marginVertical: 12,
        color: selectedDay === item ? WHITE : '#006862',
      }}
    >
      {item}
    </Text>
  </TouchableOpacity>
);

export const AvailabilityDayTile: React.FC<Props> = ({ item, selectedDay, setSelectedDay }: Props) => {
  const handlePress = () => {
    if (selectedDay !== item) {
      setSelectedDay(item);
    }
  };

  return (
    <View>
      {item === selectedDay ? (
        <LinearGradient
          style={{ borderRadius: 4 }}
          colors={['#31A59F', '#006862']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <AvailabilityTile
            item={item}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            handlePress={handlePress}
          />
        </LinearGradient>
      ) : (
        AvailabilityTile({ item, selectedDay, setSelectedDay, handlePress })
      )}
    </View>
  );
};
