import {firestore} from "firebase";

export interface Profile {
    email ?: string
    phoneNumber: string // @Griffin This needs to be canonicalized format, not just a rando string
    firstName: string
    lastName ?: string // some zombie accounts might not be made using a last name
    username ?: string // zombie accounts won't have usernames
    profileImageURL: string // zombie accounts won't have profile photos
    type: string // this is a hack
}

// TODO: Share!!!
export interface User {
    dateCreated: firestore.Timestamp | firestore.FieldValue
    version: number
    UID: string
    activated: boolean
    profile: Profile
}

export interface Event {
    dateCreated: string
    version: number
    UID: string
    title: string
    endpointUID: string
    creatorUID: string
    startTime: firestore.Timestamp // does Typescript give us a dateTime object to use here?
    type: string // this is a hack
}

export interface FriendRecord {
    targetUID: string
    dateCreated: firestore.Timestamp | firestore.FieldValue
    version: number
}

export interface EventInviteRecord {
    dateCreated: string
    version: number
    UID: string
    targetUID: string
    ownerUID: string
    eventUID: string
}

export interface Endpoint {
    tags: string[]
    image: string
    location: string // google maps link
    title: string
    description: string
}