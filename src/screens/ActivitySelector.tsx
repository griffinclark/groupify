import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { AppText, Screen } from '../atoms/AtomsExports';
import { User } from '../models';
import { getCurrentUser } from './../res/utilFunctions';
import { ActivityModal } from '../molecules/ActivityModal';
import GestureRecognizerView from 'rn-swipe-gestures';
import Constants from 'expo-constants';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
}

export interface PageProps {
  handleActivity: (activity: string) => void;
}

const PageOne: React.FC<PageProps> = ({ handleActivity }: PageProps) => {
  return (
    <View style={styles.activities}>
      <View style={styles.activitiesRow}>
        <TouchableOpacity onPress={() => handleActivity('restaurant')} testID={'activity'}>
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-food.png')} />
          </View>
          <AppText style={styles.activityText}>Get Food</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleActivity('park')} testID={'activity'}>
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-outside.png')} />
          </View>
          <AppText style={styles.activityText}>Go Outside</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleActivity('gym')} testID={'activity'}>
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-gym.png')} />
          </View>
          <AppText style={styles.activityText}>Get Fit</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.activitiesRow}>
        <TouchableOpacity onPress={() => handleActivity('shopping')} testID={'activity'}>
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-shopping.png')} />
          </View>
          <AppText style={styles.activityText}>Get Shopping</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleActivity('coffee')} testID={'activity'}>
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-coffee.png')} />
          </View>
          <AppText style={styles.activityText}>Get Coffee</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleActivity('relax')} testID={'activity'}>
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-relax.png')} />
          </View>
          <AppText style={styles.activityText}>Get Relaxed</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PageTwo: React.FC<PageProps> = ({ handleActivity }: PageProps) => {
  return (
    <View style={styles.activities}>
      <View style={styles.activitiesRow}>
        <TouchableOpacity
          onPress={() => handleActivity('bar')}
          style={{ width: Dimensions.get('window').width / 3 }}
          testID={'activity'}
        >
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-bar.png')} />
          </View>
          <AppText style={styles.activityText}>Nightlife</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActivity('entertainment')}
          style={{ width: Dimensions.get('window').width / 3 }}
          testID={'activity'}
        >
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-entertainment.png')} />
          </View>
          <AppText style={styles.activityText}>Entertainment</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActivity('museum')}
          style={{ width: Dimensions.get('window').width / 3 }}
          testID={'activity'}
        >
          <View style={styles.activitiesImageContainer}>
            <Image style={styles.activitiesImage} source={require('../../assets/activity-art.png')} />
          </View>
          <AppText style={styles.activityText}>Art & Culture</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.activitiesRow}>
        <TouchableOpacity onPress={() => handleActivity('favorites')} testID={'activity'}>
          <Image source={require('../../assets/activity-fav.png')} />
          <AppText style={styles.activityText}>Favorites</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ActivitySelector: React.FC<Props> = ({ navigation }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [modal, setModal] = useState<boolean>(false);
  const [background, setBackground] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [interval, setInterval] = React.useState<number | undefined>(1);
  const intervals = 2;
  const width = Dimensions.get('window').width;

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    awaitUser();
  }, []);

  const handleActivity = (activity: string) => {
    navigation.navigate('ActivityResults', { activity: activity });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInterval = (offset: any) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  const bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <View
        key={i}
        style={{
          ...styles.bullet,
          backgroundColor: interval === i ? '#31A59F' : '#C4C4C4',
        }}
      ></View>,
    );
  }
  return (
    <GestureRecognizerView
      /* eslint-disable */
      // @ts-expect-error
      config={{ detectSwipeDown: false, detectSwipeUp: false }}
      /* eslint-enable */
      //onSwipeLeft={() => setPage(2)}
      //onSwipeRight={() => setPage(1)}
    >
      <ScrollView testID="ActivitySelectorScreen">
        <Screen>
          <View style={styles.activitySelectorContainer}>
            <View style={styles.navbar}>
              <BackChevronIcon
                onPress={() => {
                  navigation.goBack();
                }}
                testID="back"
              />
              <AppText style={styles.navbarText}>Activity Selector</AppText>
            </View>
            {/* <Image source={require('../../assets/activity-selector.png')} /> */}
            <Image
              style={{ position: 'absolute', top: -163, width: Dimensions.get('window').width, zIndex: -10 }}
              source={require('../../assets/SplashScreen.png')}
            />
            <View style={styles.description}>
              <AppText style={styles.descriptionText}>What do you want to do today?</AppText>
              {/* <TextInput placeholder="Search for Restaurants, Parks, ..." style={styles.input} /> */}
            </View>
            <View style={styles.activitySelector}>
              <TouchableOpacity onPress={() => setModal(true)} style={styles.question}>
                <AppText style={styles.questionText}>?</AppText>
              </TouchableOpacity>

              <ScrollView
                horizontal={true}
                decelerationRate={0}
                disableIntervalMomentum={true}
                snapToInterval={Dimensions.get('window').width}
                snapToAlignment={'center'}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                scrollEventThrottle={200}
                contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
                onScroll={(data) => {
                  console.log(data.nativeEvent.contentOffset.x);
                  setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
              >
                <PageOne handleActivity={handleActivity} />
                <PageTwo handleActivity={handleActivity} />
              </ScrollView>

              <View style={styles.switch}>{bullets}</View>

              <View>
                <View style={styles.dividerRow}>
                  <View style={styles.divider} testID="divider" />
                  <AppText style={styles.dividerText}>or</AppText>
                  <View style={styles.divider} testID="divider" />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PlanCreate', { currentUser: currentUser });
                  }}
                  style={styles.activityLowerLink}
                >
                  <AppText style={styles.activityLowerLinkText}>Plan Custom Event!</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {modal && <ActivityModal modal={modal} setModal={setModal} />}
          <View style={[background ? styles.inputBackground : styles.inputContainer]}>
            <TextInput
              placeholder="Search for Restaurants, Parks, ..."
              onBlur={() => setBackground(false)}
              onFocus={() => setBackground(true)}
              onChangeText={(text) => setSearch(text)}
              onSubmitEditing={() => handleActivity(search)}
              style={styles.input}
            />
          </View>
        </Screen>
      </ScrollView>
    </GestureRecognizerView>
  );
};

const styles = StyleSheet.create({
  activitySelectorContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  navbar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    height: 99,
  },
  navbarText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#31A59F',
    marginTop: -4,
    marginLeft: 18,
  },
  description: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  descriptionText: {
    fontSize: 24,
    position: 'absolute',
    top: -32,
  },
  activitySelector: {
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 38,
    marginBottom: 55,
    paddingLeft: 5,
    width: 262,

    marginTop: 125 + Constants.statusBarHeight,
  },
  inputContainer: {
    alignSelf: 'center',
    position: 'absolute',
  },
  inputBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    // paddingTop: 125 + Constants.statusBarHeight,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  activities: {
    height: 379,
    width: Dimensions.get('window').width,
  },
  question: {
    alignItems: 'center',
    backgroundColor: '#31A59F',
    borderRadius: 31.5,
    justifyContent: 'center',
    height: 63,
    position: 'absolute',
    right: 41,
    top: -40,
    width: 63,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 0,
    position: 'absolute',
    top: -12,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  activitiesImageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#31A59F',
    borderRadius: 10,
    borderWidth: 2,
    height: 85,
    paddingTop: 5,
    width: 85,
  },
  activitiesImage: {
    height: 70,
    width: 70,
  },
  activityText: {
    fontSize: 20,
    marginBottom: 19,
    marginTop: 10,
    textAlign: 'center',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 23,
  },
  bullet: {
    borderRadius: 5.5,
    height: 11,
    marginHorizontal: 3,
    width: 11,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  divider: {
    backgroundColor: '#8b8b8b',
    height: 2,
    width: 110,
  },
  dividerText: {
    color: '#8b8b8b',
    fontSize: 24,
  },
  activityLowerLink: {
    alignSelf: 'center',
    borderColor: '#31A59F',
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 46,
    paddingVertical: 10,
    width: 267,
  },
  activityLowerLinkText: {
    color: '#31A59F',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 29,
    textAlign: 'center',
  },
});
