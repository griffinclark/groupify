import React from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { NavigationProps } from './../res/dataModels';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { StyleSheet, View, Text } from 'react-native';
import { GREY_6, WHITE } from '../res/styles/Colors';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const ActivitySelectorSlideUpCard: React.FC<Props> = ({ navigation, route }: Props) => {
  const slideUpMenuHeight = 650;
  const slideUpMenuBottom = 250;

  return (
    <SlidingUpPanel
      height={slideUpMenuHeight}
      containerStyle={{ backgroundColor: WHITE, borderRadius: 30 }}
      snappingPoints={[slideUpMenuBottom, slideUpMenuHeight]}
      draggableRange={{ top: slideUpMenuHeight, bottom: slideUpMenuBottom }}
      backdropOpacity={0}
    >
      <View style={styles.slideUpMenuRootContainer}>
        <View style={styles.slideBar} />
        <Text>Here is the content inside panel</Text>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  slideBar: {
    width: 64,
    height: 5,
    backgroundColor: GREY_6,
    borderRadius: 3,
  },
  slideUpMenuRootContainer: {
    height: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
});
