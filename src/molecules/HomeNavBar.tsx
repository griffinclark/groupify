import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GOLD, WHITE } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { User, Plan } from '../models';

interface Props {
  user?: User;
  style?: Record<string, unknown>;
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const HomeNavBar: React.FC<Props> = ({ user, style, plan, navigation }: Props) => {
  // const [showOptions, setShowOptions] = useState(false);

  return (
    <View>
      {/* {showOptions ? (
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
          {/* <Button title={'Plan Quiz'} onPress={() => console.log('Go to plan quiz')}></Button> */}
      {/* <Button title={'Random Plan'} onPress={() => console.log('Go to random plan')}></Button>
        </View>
      ) : (
        <View></View>
      )} */}
      <View style={[styles.nav, style]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation?.navigate('Profile', {
              currentUser: user,
              currentUserPlan: plan,
            });
            // setShowOptions(false);
          }}
        >
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        <Icon
          name="plus-circle"
          type="font-awesome"
          size={60}
          color={WHITE}
          onPress={() => {
            navigation.navigate('SearchPlace', { currentUser: user });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation?.navigate('ImportContactDetails', {});
            // setShowOptions(false);
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
