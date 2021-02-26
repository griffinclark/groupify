// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import * as models from "../dataModels";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCAnV-1BdHUGv3VwSZf-AoTVKsnZuaZK1w",
  authDomain: "octopus-63e06.firebaseapp.com",
  databaseURL: "https://octopus-63e06-default-rtdb.firebaseio.com",
  projectId: "octopus-63e06",
  storageBucket: "octopus-63e06.appspot.com",
  messagingSenderId: "912650001024",
  appId: "1:912650001024:web:dc1830879645063302e465",
  measurementId: "G-2TD3DXEJ4W",
});

const firestore = firebaseApp.firestore(); // access database
const auth = firebaseApp.auth(); // access authentication
const storage = firebaseApp.storage(); // allows us to upload data
const functions = firebaseApp.functions();

export interface Zombie {
  id: number; // user's phone number
  name: string;
  // email: string,
  // profilePhoto ?: string // URL of profile photo
}

export interface ImportZombiesData {
  zombies: Zombie[];
}

type ImportZombies = (
  data: ImportZombiesData
) => Promise<{}>;

const importZombies: ImportZombies = functions.httpsCallable("importZombies");
const getUser: (uid: string) => Promise<{data: models.User}> = functions.httpsCallable("getUser");
const waitForUser: (foo: {}) => Promise<{data: {hi: string}}> = functions.httpsCallable("waitForAccount");

export { firestore, auth, storage, importZombies, getUser, waitForUser };
