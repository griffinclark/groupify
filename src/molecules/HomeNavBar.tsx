import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GOLD, TEAL, WHITE } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { User, Plan } from '../models';
import { AppText } from '../atoms/AtomsExports';

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
          <AppText>What type of plan will you choose?</AppText>
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
            navigation?.navigate('InvitedPlans', {
              currentUser: user,
              currentUserPlan: plan,
            });
          }}
        >
          <Icon name="megaphone-outline" size={50} type="ionicon" color={'white'} />
          <AppText style={styles.text}>View Plans</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('SearchPlace', { currentUser: user });
          }}
        >
          <Icon name="plus-circle" type="font-awesome" size={50} color={'white'} />
          <AppText style={styles.text}>Create Plan</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation?.navigate('Profile', { currentUser: user, currentUserPlan: plan });
          }}
        >
          <Icon name="user" size={50} type="antdesign" color={'white'} />
          <AppText style={styles.text}>Profile</AppText>
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
    paddingHorizontal: '7%',
    paddingBottom: '10%',
    padding: 10,
  },
  nav: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: TEAL,
    paddingHorizontal: 30,
  },
  button: {
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 10,
    marginTop: 10,
    color: WHITE,
  },
});
