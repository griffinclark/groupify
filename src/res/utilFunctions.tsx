import { Invitee, Plan, Status, User } from '../models';
import Qs from 'qs';
import { API, Auth, DataStore } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { Platform } from 'react-native';
import { sendPushNotification } from './notifications';
import * as queries from '../graphql/queries';
import { GoogleLocation, UserLocation } from './dataModels';
import { getDistance } from 'geolib';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

//formats time to be presentable to users
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
  if (hour == 0) {
    hour += 12;
    meridian = 'PM';
  }
  return hour + newTime.toTimeString().slice(2, 5) + ' ' + meridian;
};

export const formatIosTimeInput = (time: Date | string): string => {
  const timeString = time.toString();
  const hour = timeString.substring(0, timeString.indexOf(':'));
  const minutes = timeString.substring(timeString.indexOf(':') + 1, timeString.lastIndexOf(':'));
  const meridian = timeString.includes('PM') ? 'PM' : 'AM';
  const newTime = hour + ':' + minutes + ' ' + meridian;
  return newTime;
};

//Formats date into format: DayOfWeek, Month DayOfMonth
export const formatDayOfWeekDate = (date: string, shorten?: boolean): string => {
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const newDate = convertTimeStringToDate(date);
  const month = parseInt(date.substring(date.indexOf('-') + 1, date.lastIndexOf('-')));
  const dayOfMonth = parseInt(date.substring(date.lastIndexOf('-') + 1));
  newDate.setDate(dayOfMonth);
  newDate.setMonth(month - 1);
  if (shorten) {
    return months[month - 1] + ' ' + dayOfMonth;
  }
  return daysOfWeek[newDate.getDay()] + ',' + ' ' + months[month - 1] + ' ' + dayOfMonth;
};

//formats date to be presentable to users
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

//converts a raw time string into a full time type
export const convertTimeStringToDate = (time: string): Date => {
  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(3, 5));
  const newTime = new Date();
  newTime.setHours(hours);
  newTime.setMinutes(minutes);
  return newTime;
};

//converts a raw date string into a full date type
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

//formats date to be accepted by the database
export const formatDatabaseDate = (date: string): string => {
  if (Platform.OS === 'android') {
    if (date.length === 8) {
      const newDate = 20 + date.substring(6, 8) + '-' + date.substring(0, 2) + '-' + date.substring(3, 5);
      return newDate;
    }
  }
  if (date.length === 8) {
    const newDate = 20 + date.substring(6, 8) + '-' + '0' + date.substring(0, 1) + '-' + '0' + date.substring(2, 3);
    return newDate;
  }
  if (date.length === 9 && date.substring(0, date.indexOf('/')).length == 2) {
    const year = date.substring(date.lastIndexOf('/') + 1);
    const month = date.substring(0, date.indexOf('/'));
    const day = 0 + date.substring(date.indexOf('/') + 1, date.lastIndexOf('/'));
    const newDate = year + '-' + month + '-' + day;
    return newDate;
  }
  if (date.length === 9 && date.substring(0, date.indexOf('/')).length == 1) {
    const year = date.substring(date.lastIndexOf('/') + 1);
    const month = 0 + date.substring(0, date.indexOf('/'));
    const day = date.substring(date.indexOf('/') + 1, date.lastIndexOf('/'));
    const newDate = year + '-' + month + '-' + day;
    return newDate;
  }
  if (date.length === 10) {
    const newDate = date.substring(6, 10) + '-' + date.substring(0, 2) + '-' + date.substring(3, 5);
    return newDate;
  }
  return date;
};

//formats time to be accepted by the database
export const formatDatabaseTime = (time: string): string => {
  if (time.length === 7) {
    time = 0 + time;
    const meridian = time.substring(6, 8);
    if (meridian === 'AM') {
      const newTime = time.substring(0, 5);
      return newTime;
    }
    if (meridian === 'PM') {
      let hour = parseInt(time.substring(0, 2));
      hour = hour + 12;
      const newTime = hour + ':' + time.substring(3, 5);
      return newTime;
    }
  }
  if (time.length === 8) {
    const meridian = time.substring(6, 8);
    if (meridian === 'AM') {
      const newTime = time.substring(0, 5);
      return newTime;
    }
    if (meridian === 'PM') {
      let hour = parseInt(time.substring(0, 2));
      hour === 12 ? (hour -= 12) : (hour += 12);
      let newTime = hour + ':' + time.substring(3, 5);
      newTime == '0:00' ? (newTime = '0' + newTime) : null;
      return newTime;
    }
  }
  return time;
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

//retrieves the current user
export const getCurrentUser = async (): Promise<User> => {
  const userInfo = await Auth.currentUserInfo();
  if (userInfo) {
    const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number));
    const user = userQuery.map((user) => user);
    if (user) {
      return user[0];
    }
  }
  return userInfo;
};

//format string phone number into (###) ###-####
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return phone;
  const phoneNumber = phone.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  if (phoneNumberLength < 11) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
  if (phoneNumberLength >= 11) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
  return phoneNumber;
};

//formats string phone number into +1########## for amplify format
export const amplifyPhoneFormat = (phone: string): string => {
  if (phone.length > 10) {
    const util = PhoneNumberUtil.getInstance();
    const num = util.parseAndKeepRawInput(phone, 'US');
    return util.format(num, PhoneNumberFormat.E164);
  }
  return phone;
};

//checks the current date against the plan date to determine if plan is in the future
export const isFuturePlan = (date: string, time: string, currentDate: Date): boolean => {
  const dateString = date + 'T' + time + ':00';
  const planDate = new Date(dateString);

  return currentDate < planDate ? true : false;
};

//determines if a plan is today
export const isToday = (date: string): boolean => {
  const currentDate = new Date();
  const planDay = date.substring(date.lastIndexOf('-') + 1);
  const planYear = '2,0' + date.substring(2, date.indexOf('-'));
  const planMonth = date.substring(date.indexOf('-') + 1, date.lastIndexOf('-'));
  const currentDay = currentDate.getDate().toLocaleString();
  const currentMonth =
    (currentDate.getMonth().toLocaleString().length == 1 ? 0 : null) + (currentDate.getMonth() + 1).toLocaleString();
  const currentYear = currentDate.getUTCFullYear().toLocaleString();
  if (planDay == currentDay && planMonth == currentMonth && planYear == currentYear) {
    return true;
  }
  return false;
};

export const loadInviteeStatus = async (plan: Plan): Promise<string> => {
  const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
  const currentUserStatus = await getCurrentUser().then((currentUser) => {
    if (currentUser && currentUser.id) {
    }
    const currentUserInvitee = invitees.find((invitee) => invitee.phoneNumber == currentUser.phoneNumber);
    return currentUserInvitee?.status;
  });
  if (currentUserStatus) {
    return currentUserStatus.toString();
  }
  return 'undefined';
};

//Rounds date to the next hour, if minutes are above 45 it will go to 2 hours
export const roundDate = (date: Date): Date => {
  let hours = date.getHours();
  if (date.getMinutes() > 45) {
    hours += 1;
  }
  hours += 1;
  date.setMinutes(0);
  date.setHours(hours);
  return date;
};

//Allows user to accept (true) or decline (false) a plan
export const respondToPlan = async (accept: boolean, plan: Plan): Promise<void> => {
  const phoneNumber = (await Auth.currentUserInfo()).attributes.phone_number;
  // const invitee = invitees.filter((invitee) => invitee.phoneNumber === phoneNumber)[0];
  const invitee = (await DataStore.query(Invitee)).filter(
    (invitee) => invitee.plan?.id === plan.id && invitee.phoneNumber === phoneNumber,
  )[0];
  if (accept) {
    await DataStore.save(
      Invitee.copyOf(invitee, (updated) => {
        updated.status = Status.ACCEPTED;
      }),
    );
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const hostQuery: any = await API.graphql({
      query: queries.getUser,
      variables: { id: plan.creatorID },
    });
    const host = hostQuery.data.getUser;
    if (host) {
      const userName = (await Auth.currentUserInfo()).attributes.name;
      sendPushNotification(host.pushToken, `${userName} has accepted your invite!`, 'Tap to open the app', {});
    }
  } else {
    await DataStore.save(
      Invitee.copyOf(invitee, (updated) => {
        updated.status = Status.DECLINED;
      }),
    );
  }
};

export enum GooglePlacesQueryOptions {
  Activity,
  ChangeLocation,
}

export const googlePlacesQuery: (
  text: string,
  userLocation: UserLocation,
  searchType: GooglePlacesQueryOptions,
) => Promise<GoogleLocation[]> = async (query, userLocation, searchType) => {
  //if query is one of the activity selector buttons, transform it to a more interesting query
  console.log(query);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
  const searchResults: GoogleLocation[] = [];
  switch (searchType) {
    case GooglePlacesQueryOptions.Activity:
      const unfilteredLocations: GoogleLocation[] = [];

      switch (query) {
        case 'Outdoors':
          //TODO this is now "active outdoors"
          const [r0, r1]: GoogleLocation[][] = await Promise.all([
            googlePlacesQuery('trail', userLocation, searchType),
            googlePlacesQuery('mountain', userLocation, searchType),
            // googlePlacesQuery('beach', userLocation, searchType),
          ]);
          r0.forEach((a) => unfilteredLocations.push(a));
          r1.forEach((a) => unfilteredLocations.push(a));
          // r2.forEach((a) => unfilteredLocations.push(a));
          break;
        case 'Culture':
          //TODO this is now "casual outdoors"
          const [r3, r4]: GoogleLocation[][] = await Promise.all([
            googlePlacesQuery('park', userLocation, searchType),
            googlePlacesQuery('beach', userLocation, searchType),
          ]);
          r3.forEach((a) => unfilteredLocations.push(a));
          r4.forEach((a) => unfilteredLocations.push(a));
          break;
        case 'Fitness':
          const [r5, r6, r7, r8, r9]: GoogleLocation[][] = await Promise.all([
            googlePlacesQuery('climbing gym', userLocation, searchType),
            googlePlacesQuery('boxing gym', userLocation, searchType),
            googlePlacesQuery('gym', userLocation, searchType),
            googlePlacesQuery('pool', userLocation, searchType),
            googlePlacesQuery('yoga studio', userLocation, searchType),
          ]);
          r5.forEach((a) => unfilteredLocations.push(a));
          r6.forEach((a) => unfilteredLocations.push(a));
          r7.forEach((a) => unfilteredLocations.push(a));
          r8.forEach((a) => unfilteredLocations.push(a));
          r9.forEach((a) => unfilteredLocations.push(a));
          break;
        case 'Nightlife':
          const [r10, r11, r12]: GoogleLocation[][] = await Promise.all([
            googlePlacesQuery('go kart', userLocation, searchType),
            googlePlacesQuery('movie theater', userLocation, searchType),
            googlePlacesQuery('sailing', userLocation, searchType),
            googlePlacesQuery('kayak', userLocation, searchType),
            googlePlacesQuery('zoo', userLocation, searchType),
            googlePlacesQuery('snorkel', userLocation, searchType),
            googlePlacesQuery('bike rental', userLocation, searchType),

          ]);
        default:
          const search =
            'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
            `location=${userLocation?.latitude},${userLocation.longitude}` +
            `&query=${query}` +
            // 'rankby=distance' +
            // 'radius=10000' +
            // '&type=point_of_interest' +
            `&key=${GOOGLE_PLACES_API_KEY}`;
          await fetch(search).then(
            async (res) => {
              const detail = await res.json();
              detail.results.forEach((unfilteredLocation: GoogleLocation) =>
                unfilteredLocations.push(unfilteredLocation),
              );
              // detail.results.sort((a: GoogleLocation, b: GoogleLocation) => b.user_ratings_total - a.user_ratings_total);
            },
            (rej) => {
              console.log(rej);
            },
          );
      }
      // Filter locations, sort by distance, and return
      // A complete list of location tags can be found at: https://developers.google.com/maps/documentation/places/web-service/supported_types
      const whitelist = [
        'art_gallery',
        'bakery',
        'bar',
        'beauty_salon',
        'book_store',
        'bowling_alley',
        'cafe',
        'campground',
        'casino',
        'church',
        'clothing_store',
        'department_store',
        'gym',
        'hair_care',
        'library',
        'light_rail_station',
        'lodging',
        'meal_takeaway',
        'movie_theater',
        'museum',
        'night_club',
        'park',
        'school',
        'rv_park',
        'restaurant',
        'tourist_attraction',
        'transit_station',
        'university',
        'zoo',
      ];

      //If the query is one of the activity selector buttons, we're going to make sure that we return only the locations that make sense for that button
      switch (query) {
        default:
          whitelist.push(
            'art_gallery',
            'bakery',
            'bar',
            'beauty_salon',
            'book_store',
            'bowling_alley',
            'cafe',
            'campground',
            'casino',
            'church',
            'clothing_store',
            'department_store',
            'gym',
            'hair_care',
            'library',
            'light_rail_station',
            'lodging',
            'meal_takeaway',
            'movie_theater',
            'museum',
            'night_club',
            'park',
            'school',
            'rv_park',
            'restaurant',
            'tourist_attraction',
            'transit_station',
            'university',
            'zoo',
          );
      }

      unfilteredLocations.forEach((location: GoogleLocation) => {
        if (whitelist.some((tag) => location.types.includes(tag)) == true) {
          if (getDistance(userLocation, location.geometry.location) < 30000) {
            searchResults.push(location);
          }
        }
      });
      break;

    case GooglePlacesQueryOptions.ChangeLocation:
      const changeLocSearch =
        'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        `location=${userLocation.latitude},${userLocation.longitude}` +
        `&query=${query}` +
        '&type=locality' +
        `&key=${GOOGLE_PLACES_API_KEY}`;
      await fetch(changeLocSearch).then(
        async (res) => {
          const detail = await res.json();
          detail.results.forEach((location: GoogleLocation) => searchResults.push(location));
        },
        (rej) => {
          console.log(rej);
        },
      );
      break;

    default:
      console.log('Invalid searchType: ' + searchType);
      return [];
  }
  // If we have results, return the results. If there are no results, re-run the query with one less character and return that
  if (searchResults.length > 0 || query.length == 0) {
    return searchResults;
  } else return await googlePlacesQuery(query.substring(0, query.length - 1), userLocation, searchType);
};

export const removePastPlans = (plans: Plan[]): Plan[] => {
  const currentDate = new Date();
  return plans.filter((plan) => {
    if (plan.date && plan.time) {
      return isFuturePlan(plan.date, plan.time, currentDate);
    }
  });
};
