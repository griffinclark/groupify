import React from 'react';
import { GoogleLocation, NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from './ActivityCard';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  locations: GoogleLocation[];
}
export const LocationResults: React.FC<Props> = ({ navigation, route, locations }: Props) => {
  return (
    <>
      {locations.map((location: GoogleLocation) => {
        return (
          <ActivityCard key={location.place_id} navigation={navigation} route={route} location={location} map={false} />
        );
      })}
    </>
  );
};
