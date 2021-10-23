import { Image } from 'expo-contacts';
import { User } from '../models';

export interface Profile {
  email?: string;
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
