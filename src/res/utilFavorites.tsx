// TEMPORARY FILE
// DELETE ONCE FAVORITES HANDLED BY BACKEND
import * as SecureStore from 'expo-secure-store';
import { GoogleLocation } from './dataModels';

export const getFavorites = async () => {
  const favorites = await SecureStore.getItemAsync('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = async (loc: GoogleLocation) => {
  const favorites = await getFavorites();
  const newFavorite = {
    formatted_address: loc.formatted_address,
    price_level: loc.price_level,
    rating: loc.rating,

    geometry: {
      location: {
        lat: loc.geometry.location.lat,
        lng: loc.geometry.location.lng,
      },
    },

    name: loc.name,
    user_ratings_total: loc.user_ratings_total,
    place_id: loc.place_id,
  };
  const newFavorites = [...favorites, newFavorite];
  await SecureStore.setItemAsync('favorites', JSON.stringify(newFavorites));
  return newFavorites;
};

export const deleteFavorite = async (id: string) => {
  const favorites = await getFavorites();
  const newFavorites = favorites.filter((ele: GoogleLocation) => ele.place_id != id);
  await SecureStore.setItemAsync('favorites', JSON.stringify(newFavorites));
  return newFavorites;
};
