import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GOLD, WHITE } from '../res/styles/Colors';
import { globalStyles } from '../res/styles/GlobalStyles';
import { StackProps } from '../res/root-navigation';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Button } from '../atoms/AtomsExports';
import { User } from '../models';

interface HomeNavBarProps extends StackProps {
  user?: User;
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
          <Button
            title={'Custom Plan'}
            onPress={() => {
              props.navigation?.navigate('SearchPlace', { currentUser: props.user });
              setShowOptions(false);
            }}
          />
          <Button title={'Plan Quiz'} onPress={() => console.log('Go to plan quiz')}></Button>
          <Button title={'Random Plan'} onPress={() => console.log('Go to random plan')}></Button>
        </View>
      ) : (
        <View></View>
      )}
      <View style={[styles.nav, props.style]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // TODO: Go to Profile screen
            console.log('Go to profile screen');
            setShowOptions(false);
          }}
        >
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <Icon
          name="plus-circle"
          type="font-awesome"
          size={60}
          color={WHITE}
          onPress={() => setShowOptions(!showOptions)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation?.navigate('ImportContacts');
            setShowOptions(false);
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
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GOLD,
    paddingHorizontal: 30,
  },
  button: {
    padding: 10,
  },
  text: {
    fontSize: 17,
    marginHorizontal: 10,
    color: WHITE,
  },
});
