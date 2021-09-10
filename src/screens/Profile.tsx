import { Auth, DataStore } from 'aws-amplify';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, Screen } from '../atoms/AtomsExports';
import { MediumPlanTile } from '../molecules/MediumPlanTile';
import { RoutePropParams } from '../res/root-navigation';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const Profile: React.FC<Props> = ({ navigation, route }: Props) => {
  const currentUser = route.params.currentUser;
  const currentUserPlan = route.params.currentUserPlan;
  // const [sundayAvailabilityStart, setSundayAvailabilityStart] = useState('');
  // const [sundayAvailabilityEnd, setSundayAvailabilityEnd] = useState('');
  // const [mondayAvailabilityStart, setMondayAvailabilityStart] = useState('');
  // const [mondayAvailabilityEnd, setMondayAvailabilityEnd] = useState('');
  // const [tuesdayAvailabilityStart, setTuesdayAvailabilityStart] = useState('');
  // const [tuesdayAvailabilityEnd, setTuesdayAvailabilityEnd] = useState('');

  // useEffect(() => {
  //   setAvailability();
  // }, [currentUser]);

  // const setAvailability = async () => {
  //   const user = await DataStore.query(User, route.params.currentUser.id);
  //   if (
  //     user &&
  //     user.availability &&
  //     user.availability.Sunday &&
  //     user.availability.Monday &&
  //     user.availability.Tuesday
  //   ) {
  //     setSundayAvailabilityStart(formatTime(new Date(`2021-01-01T${user.availability.Sunday[0]}`)));
  //     setSundayAvailabilityEnd(formatTime(new Date(`2021-01-01T${user.availability.Sunday[1]}`)));
  //     setMondayAvailabilityStart(formatTime(new Date(`2021-01-01T${user.availability.Monday[0]}`)));
  //     setMondayAvailabilityEnd(formatTime(new Date(`2021-01-01T${user.availability.Monday[1]}`)));
  //     setTuesdayAvailabilityStart(formatTime(new Date(`2021-01-01T${user.availability.Tuesday[0]}`)));
  //     setTuesdayAvailabilityEnd(formatTime(new Date(`2021-01-01T${user.availability.Tuesday[1]}`)));
  //   }
  // };

  return (
    <Screen>
      <View style={styles.detailContainer}>
        <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.navigate('Home', {})} />
        <View style={styles.details}>
          <View style={styles.userPhoto}>
            <AppText style={styles.text}>{currentUser.name.substring(0, 1)}</AppText>
          </View>
          <AppText style={styles.textName}>{currentUser.name}</AppText>
        </View>
        <Icon
          name="logout"
          type="material"
          size={30}
          onPress={async () => {
            try {
              await DataStore.clear();
              await DataStore.stop();
              await DataStore.start();
              await Auth.signOut();
              console.log(route.params.currentUser);
              console.log('Successfully signed out');
              navigation.navigate('Login', { currentUser: null });
            } catch (err) {
              console.log('error signing out...', err);
            }
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(currentUserPlan ? 'InvitedPlans' : 'SearchPlace', { currentUser: currentUser })
          }
          style={styles.userActivity}
        >
          <View style={styles.selector}>
            <AppText style={styles.planTitle}>Invites/Plans</AppText>
            <Icon name="chevron-forward-outline" size={30} type="ionicon" />
          </View>
          {currentUserPlan ? (
            <View style={styles.plan}>
              <MediumPlanTile plan={currentUserPlan} />
            </View>
          ) : (
            <View style={{ alignItems: 'center', padding: 20 }}>
              <AppText style={{ fontSize: 20, fontWeight: '200' }}>Looks like you don&apos;t have any plans.</AppText>
              <AppText style={{ fontSize: 20, fontWeight: '200' }}>Lets create one together! </AppText>
            </View>
          )}

          {/*
          <View style={styles.availability}>
            <View style={styles.availabilityDays}>
              <AppText style={styles.availabilityText}>Sunday</AppText>
              <AppText style={styles.availabilityText}>
                <AppText style={{ color: '#31A59F' }}>{sundayAvailabilityStart}</AppText> to{' '}
                <AppText style={{ color: '#31A59F' }}>{sundayAvailabilityEnd}</AppText>
              </AppText>
            </View>
            <View style={styles.availabilityDays}>
              <AppText style={styles.availabilityText}>Monday</AppText>
              <AppText style={styles.availabilityText}>
                <AppText style={{ color: '#31A59F' }}>{mondayAvailabilityStart}</AppText> to{' '}
                <AppText style={{ color: '#31A59F' }}>{mondayAvailabilityEnd}</AppText>
              </AppText>
            </View>
            <View style={styles.availabilityDays}>
              <AppText style={styles.availabilityText}>Tuesday</AppText>
              <AppText style={styles.availabilityText}>
                <AppText style={{ color: '#31A59F' }}>{tuesdayAvailabilityStart}</AppText> to{' '}
                <AppText style={{ color: '#31A59F' }}>{tuesdayAvailabilityEnd}</AppText>
              </AppText>
            </View>
          </View>
          */}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditFriends', {
              userID: route.params.currentUser.id,
            });
          }}
          style={styles.bugReport}
        >
          <AppText style={{ fontSize: 18 }}>Edit Friends</AppText>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://forms.gle/ysqh1hg5NhisEAcM7')}
          style={styles.bugReport}
        >
          <AppText style={{ fontSize: 18 }}>Submit Bug Report</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ImportContacts', {})} style={styles.bugReport}>
          <AppText style={{ fontSize: 18 }}>Import Contacts</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  detailContainer: {
    elevation: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    backgroundColor: 'white',
    flex: 1,
    marginTop: -45,
  },
  userPhoto: {
    backgroundColor: '#C4C4C4',
    width: 150,
    height: 150,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#BE8C2C',
  },
  text: {
    fontSize: 60,
    fontWeight: '800',
    color: 'white',
  },
  bodyContainer: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textName: {
    fontWeight: '700',
    fontSize: 22,
    padding: 10,
  },
  bugReport: {
    paddingVertical: 15,
    width: 270,
    borderWidth: 1,
    borderColor: '#31A59F',
    borderRadius: 25,
    textAlignVertical: 'center',
    alignItems: 'center',
    margin: 8,
  },
  userActivity: {
    width: '90%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#BE8C2C',
    margin: 20,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginHorizontal: 15,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 0.5,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  plan: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  availability: {
    paddingHorizontal: 20,
  },
  availabilityDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: '400',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
