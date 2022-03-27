import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { JOST } from '../res/styles/Fonts';
import { WHITE } from '../res/styles/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface Props {
  // onPress: () => void;
  item: string;
  day: string;
}

interface TimeProps {
  handlePress: (time: any) => void;
  selected: boolean;
  item: string;
}

const Time: React.FC<TimeProps> = ({ handlePress, selected, item }: TimeProps) => (
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
  const [availableTime, setAvailableTime] = useState<any>({
    Mon: [],
  });
  const [selectedTime, setSelectedTime] = useState<string[]>([]);

  // const handlePress = () => {
  //   if (!selected) {
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //     setSelectedTime([item]);
  //     availableTime.Mon = [item];
  //     setAvailableTime({ ...availableTime });
  //     setSelected(true);
  //   }
  //   if (selected) {
  //     setSelected(false);
  //   }
  // };

  const handlePress = () => {
    if (!selected) {
      const random = [];
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedTime([item]);
      random.push(item);
      availableTime.Mon = random;
      setAvailableTime((curr: any) => ({ ...curr, availableTime }));
      setSelected(true);
    }
    if (selected) {
      setSelected(false);
    }
  };

  useEffect(() => {
    console.log('availableTime', availableTime);
    // console.log('availableTime', selectedTime);
  }, [selected]);

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
