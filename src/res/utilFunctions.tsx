import { Plan, User } from '../models';
import Qs from 'qs';
import { Auth, DataStore } from 'aws-amplify';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const formatTime = (time: Date | string): string => {
  let newTime = new Date();
  if (typeof time === 'string') {
    newTime = convertTimeStringToDate(time);
  }
  if (time instanceof Date) {
    newTime = time;
  }
  let meridian = 'AM';
  let hour = newTime.getHours();
  if (hour > 12) {
    hour -= 12;
    meridian = 'PM';
  }
  return hour + newTime.toTimeString().slice(2, 5) + ' ' + meridian;
};

export const formatDate = (date: Date | string): string => {
  let newDate = new Date();
  if (typeof date === 'string') {
    newDate = convertDateStringToDate(date);
  }
  if (date instanceof Date) {
    newDate = date;
  }
  return newDate.getMonth() + 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
};

export const convertTimeStringToDate = (time: string): Date => {
  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(3, 5));
  const newTime = new Date();
  newTime.setHours(hours);
  newTime.setMinutes(minutes);
  return newTime;
};

export const convertDateStringToDate = (date: string): Date => {
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(5, 7));
  const day = parseInt(date.slice(8, 10));
  const newDate = new Date();
  newDate.setUTCHours(0, 0, 0);
  newDate.setFullYear(year);
  newDate.setMonth(month - 1);
  newDate.setDate(day);
  return newDate;
};

// Sorts a list of plans by their date. Set 'reverse' to true to reverse the order.
export const sortPlansByDate = (plans: Plan[], reverse = false): Plan[] => {
  return plans.sort((planA, planB) => comparePlansByDate(planA, planB, reverse));
};

// Helper function for sorting plans. The plan with more recent date comes before. Set 'reverse' to true to reverse order.
export const comparePlansByDate = (planA: Plan, planB: Plan, reverse = false): number => {
  if (planA.date && planB.date) {
    const DateA = convertDateStringToDate(planA.date);
    const DateB = convertDateStringToDate(planB.date);
    if (DateA.getTime() < DateB.getTime()) {
      return reverse ? 1 : -1;
    } else if (DateA.getTime() === DateB.getTime()) {
      return 0;
    } else {
      return reverse ? -1 : 1;
    }
  }
  return 0;
};

// Returns the uri for a photo given a place's placeID using Google Places API
export const loadPhoto = async (placeID: string): Promise<string> => {
  const photoRequestURL = 'https://maps.googleapis.com/maps/api/place/photo?';
  const search = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await fetch(search);
  const detail = await response.json();
  const photoReference = detail.result.photos[0].photo_reference;
  const photoRequetsParams = {
    key: GOOGLE_PLACES_API_KEY,
    maxwidth: 500,
    maxheight: 500,
    photoreference: photoReference,
  };
  const completeUri = photoRequestURL + Qs.stringify(photoRequetsParams);
  return completeUri;
};

export const getCurrentUser = async (): Promise<User> => {
  const userInfo = await Auth.currentUserInfo();
  if (userInfo) {
    // console.log(userInfo.attributes.phone_number);
    const user = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number));
    if (user) {
      // console.log(user[0]);
      return user[0];
    }
  }
};
