import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GOLD, WHITE } from '../res/styles/Colors';
import { globalStyles } from '../res/styles/GlobalStyles';
import { StackProps } from '../res/root-navigation';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Button } from '../atoms/AtomsExports';

interface HomeNavBarProps extends StackProps {
  style?: Record<string, unknown>;
}

export const HomeNavBar: React.FC<HomeNavBarProps> = (props: HomeNavBarProps) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View>
      {showOptions ? (
        <View style={styles.planOptions}>
          <Text>What type of plan will you choose?</Text>
          <View style={globalStyles.miniSpacer} />
          <Button title={'Custom Plan'} onPress={() => props.navigation?.navigate('SearchPlace')}></Button>
          <Button title={'Plan Quiz'} onPress={() => props.navigation?.navigate('SearchPlace')}></Button>
          <Button title={'Random Plan'} onPress={() => props.navigation?.navigate('SearchPlace')}></Button>
        </View>
      ) : (
        <View></View>
      )}
      <View style={[styles.nav, props.style]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // TODO: Go to Profile screen
          }}
        >
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <Icon
          name="plus-circle"
          type="font-awesome"
          size={45}
          color={WHITE}
          onPress={() => setShowOptions(!showOptions)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation?.navigate('ImportContacts');
          }}
        >
          <Text style={styles.text}>Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planOptions: {
    alignItems: 'center',
    backgroundColor: WHITE,
    borderColor: GOLD,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: '7%',
    marginBottom: '10%',
    padding: 10,
  },
  nav: {
    width: '100%',
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: GOLD,
    paddingHorizontal: 30,
    paddingBottom: 5,
    bottom: 0,
  },
  button: {
    padding: 10,
  },
  text: {
    fontSize: 17,
    color: WHITE,
  },
});
