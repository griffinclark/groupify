import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native';
import { AppText } from '../atoms/AtomsExports';
import { GOOGLE_PLACES_API_KEY } from '../res/utilGoogle';
import Qs from 'qs';

interface Props {
  referenceId: String;
  width: number,
  height: number
}

export const ActivityImage: React.FC<Props> = ({ referenceId, width, height }: Props) => {

  const loadPhotoUri = ( photoReference: String) => {
    const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    const photoRequetsParams = {
      key: GOOGLE_PLACES_API_KEY,
      maxwidth: 300,
      maxheight: 300,
      photoreference: photoReference,
    };
    return photoRequestURL + Qs.stringify(photoRequetsParams);
  }

  return (
    <View>
      <Image source={{uri: loadPhotoUri(referenceId)}} style={{ width: width, height: height, borderRadius: 10}} resizeMode="cover" />
    </View>
  );
};


