import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { AppText } from '../atoms/AtomsExports';
import { TEAL } from '../res/styles/Colors';
import { NoResults } from '../molecules/MoleculesExports';
import { ActivityList } from '../organisms/ActivityList';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { getFavorites } from '../res/utilFavorites';
import { getCurrentUser } from './../res/utilFunctions';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
}

export const ActivityFavorites: React.FC<Props> = ({ navigation }: Props) => {
  const [favorites, setFavorites] = useState([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  useEffect(() => {
    queryFavorites();
  }, [trigger]);

  const queryFavorites = async () => {
    const newFavorites = await getFavorites();
    setFavorites(newFavorites);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (loc: any) => {
    const user = await getCurrentUser();
    navigation.navigate('PlanCreate', {
      currentUser: user,
      data: {
        planData: {
          location: loc.formatted_address,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <BackChevronIcon
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AppText style={styles.navbarText}>Favorites</AppText>
      </View>
      {favorites.length < 1 ? (
        <NoResults title="No favorites to see here, yet!" />
      ) : (
        <ActivityList
          handleCreate={handleCreate}
          locations={favorites}
          navigation={navigation}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  navbar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingBottom: 26,
    paddingHorizontal: 30,
    paddingTop: Constants.statusBarHeight,
  },
  navbarText: {
    fontSize: 30,
    fontWeight: '700',
    color: TEAL,
    marginTop: -4,
    marginLeft: 18,
  },
});
