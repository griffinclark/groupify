import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { AppText } from '../atoms/AtomsExports';
import { TEAL_0 } from '../res/styles/Colors';
import { NoResults } from '../molecules/MoleculesExports';
import { ActivityList } from '../organisms/ActivityList';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { getFavorites } from '../res/utilFavorites';
import { getCurrentUser } from './../res/utilFunctions';
import { copy } from '../res/groupifyCopy';
import { GoogleLocation } from './../res/dataModels';

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

  const handleCreate = async (loc: GoogleLocation) => {
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
        <AppText style={styles.navbarText}>{copy.activityFavoritesText}</AppText>
      </View>
      {favorites.length < 1 ? (
        <NoResults title={copy.activityFavoritesEmptyState} />
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
    color: TEAL_0,
    marginTop: -4,
    marginLeft: 18,
  },
});
