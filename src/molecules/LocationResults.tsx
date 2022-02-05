import React from 'react';
import { GoogleLocation, NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from './ActivityCard';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  locations: GoogleLocation[];
  tempUserLocationQuery: string
  onSelectLocation?: (location: GoogleLocation) => void
}
export const LocationResults: React.FC<Props> = ({ navigation, route, locations, tempUserLocationQuery, onSelectLocation }: Props) => {
  return (
    <>
      {locations.map((location: GoogleLocation) => {
        return (
          <ActivityCard key={location.place_id} navigation={navigation} route={route} tempUserLocationQuery={tempUserLocationQuery} location={location} map={false} onSelectLocation={onSelectLocation} />
        );
      })}
    </>
  );
};
