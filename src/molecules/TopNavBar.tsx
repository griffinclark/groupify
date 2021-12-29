import React from 'react';
import { StyleSheet, View, Image, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from '../atoms/AppText';
import { GREY_4, WHITE } from '../res/styles/Colors';

interface Props {
  title?: string;
  navigation: {
    goBack: () => void;
  };
  displayGroupify: boolean;
}

export const TopNavBar: React.FC<Props> = ({ title, navigation, displayGroupify }: Props) => {
  return (
    <View style={styles.topNavBarRoot}>
      {displayGroupify ? (
        <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
      ) : (
        <AppText>{title}</AppText>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarLogo: {
    height: 45,
    width: 130,
  },
  topNavBarRoot: {
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
  },
  activitiesImage: {
    height: 30,
    width: 30,
  },
});
