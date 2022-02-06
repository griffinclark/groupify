import React from 'react';
import { Image } from 'react-native';
import { View } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from '../res/utilGoogle';
import Qs from 'qs';

interface Props {
  referenceId: string;
  width: number;
  height: number;
  containerStyle?: Record<string, unknown>;
}

export const ActivityImage: React.FC<Props> = ({ referenceId, width, height, containerStyle }: Props) => {
  const loadPhotoUri = (photoReference: string) => {
    const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    const photoRequetsParams = {
      key: GOOGLE_PLACES_API_KEY,
      maxwidth: 300,
      maxheight: 300,
      photoreference: photoReference,
    };
    return photoRequestURL + Qs.stringify(photoRequetsParams);
  };

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: loadPhotoUri(referenceId) }}
        style={{ width: width, height: height, borderRadius: 10 }}
        resizeMode="cover"
      />
    </View>
  );
};
