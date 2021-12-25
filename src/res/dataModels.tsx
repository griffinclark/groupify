import { Image } from 'expo-contacts';
import { User } from '../models';

export interface Profile {
  phoneNumber: string; // @Griffin This needs to be canonicalized format, not just a rando string
  firstName: string;
  lastName?: string; // some zombie accounts might not be made using a last name
  username?: string; // zombie accounts won't have usernames
  profileImageURL: string; // zombie accounts won't have profile photos
}
export interface Event {
  contacts: Contact[];
  friends: User[];
  uuid: string;
  title: string;
  imageURL: string;
  description: string;
  tags: string[];
  date: string;
  time: string;
  location: string;
  showImage: string;
  placeId: string;
}

export interface Contact {
  id: string;
  name: string;
  image?: Image | undefined;
  phoneNumber: string;
}

export interface XYLocation {
  lng: number;
  lat: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface GoogleLocation {
  business_status: string;
  formatted_address: string;
  geometry: { location: XYLocation; viewport: { northeast: XYLocation; southwest: XYLocation } };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: { open_now: boolean };
  photos: Photo[];
  place_id: string;
  plusCode: { compound_code: string; global_code: string };
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
  price_level: number;
}

export interface Photo {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}
