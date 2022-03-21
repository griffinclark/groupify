import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import { JOST } from '../res/styles/Fonts';

interface Props {
  item: any;
}

export const GenderItemCard: React.FC<Props> = ({ item }: Props) => {
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
    <View style={{}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
        <Checkbox.Android
          status={selected ? 'checked' : 'unchecked'}
          onPress={handlePress}
          color="#3F8A8D"
          uncheckedColor="#3F8A8D"
        />
        <Text style={{ fontFamily: JOST['400'], fontSize: 16 }}>{item.gender}</Text>
      </View>
      <Divider color="#8B8B8B" style={{ width: 335, marginLeft: 10 }} orientation="horizontal" />
    </View>
  );
};
