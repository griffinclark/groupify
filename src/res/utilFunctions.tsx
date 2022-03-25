import { Invitee, Plan, Status, User } from '../models';
import Qs from 'qs';
import { API, Auth, DataStore } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { Platform } from 'react-native';
import { sendPushNotification } from './notifications';
import * as queries from '../graphql/queries';
import { GoogleLocation, NavigationProps, UserLocation, ActivityEnum } from './dataModels';
import { getDistance } from 'geolib';
import { RoutePropParams } from './root-navigation';
import { GOOGLE_PLACES_API_KEY } from './utilGoogle';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';

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

export const formatDatePlanView = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
};

//Formats date into format: DayOfWeek, Month DayOfMonth
export const formatDayOfWeekDate = (date: string, shorten?: boolean, withYear?: boolean): string => {
  if (!date) return '';
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const newDate = convertDateStringToDate(date);
  const month = parseInt(date.substring(date.indexOf('-') + 1, date.lastIndexOf('-')));
  const dayOfMonth = parseInt(date.substring(date.lastIndexOf('-') + 1));
  newDate.setDate(dayOfMonth);
  newDate.setMonth(month - 1);

  if (shorten) {
    return months[month - 1] + ' ' + dayOfMonth;
  }

  const result = daysOfWeek[newDate.getDay()] + ',' + ' ' + months[month - 1] + ' ' + dayOfMonth;

  if (withYear) {
    return result + ', ' + newDate.getFullYear();
  }
  return result;
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
    // const newDate = date.substring(6, 10) + '-' + date.substring(0, 2) + '-' + date.substring(3, 5);
    return date;
  }
  return date;
};

export const formatDataDate = (date: string): string => {
  const d = new Date(date),
    year = d.getFullYear();

  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
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
export const loadPlaceDetails = async (placeID: string): Promise<GoogleLocation> => {
  const search = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await fetch(search);
  const detail = await response.json();

  return detail.result;
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
      return user[1];
    } else {
      console.log('no user');
    }
  } else {
    console.log('error getting user info');
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

// determines if a plan is in the past
//TODO rename to isPlanPast. Little bit easier to read IMO
export const isPastPlan = (date: string, time: string, currentDate: Date): boolean => {
  const dateString = date + 'T' + time + ':00';
  const planDate = new Date(dateString);

  return currentDate > planDate ? true : false;
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

export enum GooglePlacesQueryOptions {
  Activity,
  ChangeLocation,
}

const googleQuerySearch: (queryTerm: string, userLocation: UserLocation) => Promise<GoogleLocation[]> = async (
  query,
  userLocation,
) => {
  const search =
    'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
    `location=${userLocation?.latitude},${userLocation.longitude}` +
    `&query=${query}` +
    '&fields=rating' +
    `&key=${GOOGLE_PLACES_API_KEY}`;

  const unfilteredLocations: GoogleLocation[] = [];

  await fetch(search).then(
    async (res) => {
      const detail = await res.json();
      detail.results.forEach((unfilteredLocation: GoogleLocation) => unfilteredLocations.push(unfilteredLocation));
    },
    (rej) => {
      console.log(rej);
    },
  );

  return unfilteredLocations;
};

export const googlePlacesQuery: (
  text: string,
  userLocation: UserLocation,
  searchType: GooglePlacesQueryOptions,
) => Promise<GoogleLocation[]> = async (query, userLocation, searchType) => {
  //if query is one of the activity selector buttons, transform it to a more interesting query

  const searchResults: GoogleLocation[] = [];

  switch (searchType) {
    case GooglePlacesQueryOptions.Activity:
      let unfilteredLocations: GoogleLocation[] = [];

      switch (query) {
        case ActivityEnum.Happening:
          const [live, theatre, concert, show, foodtruck, farmer]: GoogleLocation[][] = await Promise.all([
            googleQuerySearch('live music', userLocation),
            googleQuerySearch('theatre', userLocation),
            googleQuerySearch('concert', userLocation),
            googleQuerySearch('art show', userLocation),
            googleQuerySearch('food truck', userLocation),
            googleQuerySearch('"farmer\'s·market"', userLocation),
          ]);
          unfilteredLocations = unfilteredLocations.concat(live, theatre, concert, show, foodtruck, farmer);
          break;
        case ActivityEnum.Outdoors:
          const [
            trail,
            mountain,
            beack,
            park,
            pier,
            bonfire,
            garden,
            snow,
            skii,
            sled,
            paddle,
            fish,
            golf,
          ]: GoogleLocation[][] = await Promise.all([
            googleQuerySearch('trail', userLocation),
            googleQuerySearch('mountain', userLocation),
            googleQuerySearch('beach', userLocation),
            googleQuerySearch('park', userLocation),
            googleQuerySearch('pier', userLocation),
            googleQuerySearch('bonfire', userLocation),
            googleQuerySearch('garden', userLocation),
            googleQuerySearch('snowboarding', userLocation),
            googleQuerySearch('skiing', userLocation),
            googleQuerySearch('sledding', userLocation),
            googleQuerySearch('paddle boarding', userLocation),
            googleQuerySearch('fishing', userLocation),
            googleQuerySearch('disc golf', userLocation),
          ]);
          unfilteredLocations = unfilteredLocations.concat(
            trail,
            mountain,
            beack,
            park,
            pier,
            bonfire,
            garden,
            snow,
            skii,
            sled,
            paddle,
            fish,
            golf,
          );

          break;
        case ActivityEnum.Food:
          const [restau]: GoogleLocation[][] = await Promise.all([googleQuerySearch('restaurants', userLocation)]);

          unfilteredLocations = unfilteredLocations.concat(restau);
          break;
        case ActivityEnum.Chill:
          const [boba, coffee, tea, acai, smoothie]: GoogleLocation[][] = await Promise.all([
            googleQuerySearch('boba', userLocation),
            googleQuerySearch('coffee', userLocation),
            googleQuerySearch('tea', userLocation),
            googleQuerySearch('acai', userLocation),
            googleQuerySearch('smoothie', userLocation),
          ]);

          unfilteredLocations = unfilteredLocations.concat(boba, coffee, tea, acai, smoothie);
          break;
        case ActivityEnum.Exercise:
          const [climb, yoga, gym, boxing, swim, pilates, martial, parkor, spin]: GoogleLocation[][] =
            await Promise.all([
              googleQuerySearch('climbing gym', userLocation),
              googleQuerySearch('yoga studio', userLocation),
              googleQuerySearch('gym', userLocation),
              googleQuerySearch('boxing gym', userLocation),
              googleQuerySearch('swimming pool', userLocation),
              googleQuerySearch('pilates', userLocation),
              googleQuerySearch('martial arts', userLocation),
              googleQuerySearch('parkor', userLocation),
              googleQuerySearch('spin class', userLocation),
            ]);

          unfilteredLocations = unfilteredLocations.concat(
            climb,
            yoga,
            gym,
            boxing,
            swim,
            pilates,
            martial,
            parkor,
            spin,
          );
          break;
        case ActivityEnum.Indoor:
          const [pool, arcade, bowl, poker, trampoline, parkour, game, axe, escape]: GoogleLocation[][] =
            await Promise.all([
              googleQuerySearch('pool hall', userLocation),
              googleQuerySearch('arcade', userLocation),
              googleQuerySearch('bowling', userLocation),
              googleQuerySearch('poker', userLocation),
              googleQuerySearch('trampoline park', userLocation),
              googleQuerySearch('parkour', userLocation),
              googleQuerySearch('game room', userLocation),
              googleQuerySearch('axe throwing', userLocation),
              googleQuerySearch('escape room', userLocation),
            ]);

          unfilteredLocations = unfilteredLocations.concat(
            pool,
            arcade,
            bowl,
            poker,
            trampoline,
            parkour,
            game,
            axe,
            escape,
          );
          break;
        case ActivityEnum.Sports:
          const [volley, pickle, tennis, basket, soccer, baseball, paintball, airsoft]: GoogleLocation[][] =
            await Promise.all([
              googleQuerySearch('volleyball court', userLocation),
              googleQuerySearch('pickle ball court', userLocation),
              googleQuerySearch('tennis court', userLocation),
              googleQuerySearch('basketball court', userLocation),
              googleQuerySearch('soccer field', userLocation),
              googleQuerySearch('baseball field', userLocation),
              googleQuerySearch('paintball', userLocation),
              googleQuerySearch('airsoft', userLocation),
            ]);

          unfilteredLocations = unfilteredLocations.concat(
            volley,
            pickle,
            tennis,
            basket,
            soccer,
            baseball,
            paintball,
            airsoft,
          );
          break;
        case ActivityEnum.AllDay:
          const [
            zoo,
            zipline,
            aquarium,
            museum,
            ice,
            skate,
            water,
            art,
            kayak,
            theater,
            sufboard,
            bike,
            sky,
          ]: GoogleLocation[][] = await Promise.all([
            googleQuerySearch('zoo', userLocation),
            googleQuerySearch('ziplining', userLocation),
            googleQuerySearch('aquarium', userLocation),
            googleQuerySearch('museum', userLocation),
            googleQuerySearch('ice skating', userLocation),
            googleQuerySearch('skate park', userLocation),
            googleQuerySearch('water park', userLocation),
            googleQuerySearch('art', userLocation),
            googleQuerySearch('kayak rental', userLocation),
            googleQuerySearch('theater', userLocation),
            googleQuerySearch('surfboard rental', userLocation),
            googleQuerySearch('bike rental', userLocation),
            googleQuerySearch('skydiving', userLocation),
          ]);

          unfilteredLocations = unfilteredLocations.concat(
            zoo,
            zipline,
            aquarium,
            museum,
            ice,
            skate,
            water,
            art,
            kayak,
            theater,
            sufboard,
            bike,
            sky,
          );
          break;
        default:
          const search =
            'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
            `location=${userLocation?.latitude},${userLocation.longitude}` +
            `&query=${query}` +
            // 'rankby=distance' +
            // 'radius=10000' +
            // '&type=point_of_interest' +
            '&fields=rating' +
            `&key=${GOOGLE_PLACES_API_KEY}`;
          await fetch(search).then(
            async (res) => {
              const detail = await res.json();
              detail.results.forEach((unfilteredLocation: GoogleLocation) =>
                unfilteredLocations.push(unfilteredLocation),
              );
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

      // Gather place_id to make sure we don't have duplicate places
      const placeIdArr: string[] = [];

      unfilteredLocations.forEach((location: GoogleLocation) => {
        if (
          location.types.length &&
          whitelist.some((tag) => location.types.includes(tag)) == true &&
          !placeIdArr.includes(location.place_id) &&
          getDistance(userLocation, location.geometry.location) < 30000
        ) {
          placeIdArr.push(location.place_id);
          searchResults.push(location);
        }
      });
      break;

    case GooglePlacesQueryOptions.ChangeLocation:
      const changeLocSearch =
        'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        `location=${userLocation.latitude},${userLocation.longitude}` +
        `&query=${query}` +
        '&type=locality' +
        '&fields=rating' +
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

export const removePastPlans = (plans: Plan[]): Plan[] => {
  const currentDate = new Date();
  return plans.filter((plan) => {
    if (plan.date && plan.time) {
      return isFuturePlan(plan.date, plan.time, currentDate);
    }
  });
};

// add past plans
export const addPastPlans = (plans: Plan[]): Plan[] => {
  //TODO another reminder to type your variables
  const currentDate: Date = new Date();
  return plans.filter((plan) => {
    if (plan.date && plan.time) {
      return isPastPlan(plan.date, plan.time, currentDate);
    }
  });
};

export const getHost = async (id: string): Promise<string | undefined> => {
  //TODO why is this type any? This should have a type, especially if you're calling variable.value on it. This appears multiple places in your code
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const userQuery: any = await API.graphql({
    query: queries.getUser,
    variables: { id: id },
  });
  const user = userQuery.data.getUser;
  if (user) {
    return user.name;
  }
};
export const getUserLocation = async (): Promise<UserLocation | undefined> => {
  const { status } = await Location.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission to access location was denied');
  } else {
    try {
      let location = await Location.getLastKnownPositionAsync();

      if (location === null) {
        location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest });
      }

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (e) {
      // TODO what error should be displayed here?
      console.log(e);
      return null;
    }
  }
};
export const navigateToPlanMap = async (
  query: string,
  navigation: NavigationProps,
  route: RoutePropParams,
  tempUserLocationQuery: string,
  tempUserLocation: UserLocation,
): Promise<void> => {
  // rerun the query with the name of the selected venue so all venues with the same name show up on the map
  try {
    const results = await googlePlacesQuery(query, tempUserLocation, GooglePlacesQueryOptions.Activity);
    navigation.navigate('PlanMap', {
      navigation: navigation,
      route: route,
      data: {
        activitySearchData: {
          tempUserLocation: tempUserLocation,
          tempUserLocationQuery: tempUserLocationQuery,
          placesUserWantsToGoResults: results,
          placesUserWantsToGoQuery: query,
        },
      },
      currentUser: route.params.currentUser,
      userLocation: route.params.userLocation,
    });
  } catch (e) {
    // TODO fix
    console.log(e);
  }
};
