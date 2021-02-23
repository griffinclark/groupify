
export interface User {
    dateCreated: string
    version: number
    UID: string
    activated: boolean
    email ?: string
    phoneNumber: string
    firstName: string
    lastName ?: string // some zombie accounts might not be made using a last name
    username ?: string // zombie accounts won't have usernames
    profileImageURL: string // zombie accounts won't have profile photos

}

export interface Event {
    dateCreated: string
    version: number
    UID: string
    title: string
    endpointUID: string
    creatorUID: string
    startTime: string // does Typescript give us a dateTime object to use here?

}

export interface FriendRecord {
    dateCreated: string
    version: number
    UID: string
    targetUID: string // user who the record is pointing at
    ownerUID: string // user who created the record
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