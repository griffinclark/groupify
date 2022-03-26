import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Sender {
  USER = "USER",
  NOTIFICATIONPANEL = "NOTIFICATIONPANEL"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NONBINARY = "NONBINARY",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"
}

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}



type InterestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AvailabilityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NotificationFromToMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlanMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlanArbitrationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InviteeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Interest {
  readonly id: string;
  readonly user?: User;
  readonly userID: string;
  readonly interest?: string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Interest, InterestMetaData>);
  static copyOf(source: Interest, mutator: (draft: MutableModel<Interest, InterestMetaData>) => MutableModel<Interest, InterestMetaData> | void): Interest;
}

export declare class User {
  readonly id: string;
  readonly phoneNumber: string;
  readonly name: string;
  readonly pushToken: string;
  readonly friends?: string;
  readonly email?: string;
  readonly availability?: Availability;
  readonly notificationsSent?: (NotificationFromTo | null)[];
  readonly notificationsRecieved?: (NotificationFromTo | null)[];
  readonly age?: string;
  readonly gender?: Gender | keyof typeof Gender;
  readonly interests?: (Interest | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Availability {
  readonly id: string;
  readonly Sunday?: (string | null)[];
  readonly Monday?: (string | null)[];
  readonly Tuesday?: (string | null)[];
  readonly Wednesday?: (string | null)[];
  readonly Thursday?: (string | null)[];
  readonly Friday?: (string | null)[];
  readonly Saturday?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Availability, AvailabilityMetaData>);
  static copyOf(source: Availability, mutator: (draft: MutableModel<Availability, AvailabilityMetaData>) => MutableModel<Availability, AvailabilityMetaData> | void): Availability;
}

export declare class NotificationFromTo {
  readonly id: string;
  readonly senderType?: Sender | keyof typeof Sender;
  readonly notification: Notification;
  readonly sender?: User;
  readonly recipient: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<NotificationFromTo, NotificationFromToMetaData>);
  static copyOf(source: NotificationFromTo, mutator: (draft: MutableModel<NotificationFromTo, NotificationFromToMetaData>) => MutableModel<NotificationFromTo, NotificationFromToMetaData> | void): NotificationFromTo;
}

export declare class Notification {
  readonly id: string;
  readonly body: string;
  readonly data?: string;
  readonly ttl?: number;
  readonly messageSubtitle?: string;
  readonly sound?: boolean;
  readonly channel?: string;
  readonly recipients?: (NotificationFromTo | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}

export declare class Plan {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly placeID?: string;
  readonly date?: string;
  readonly time?: string;
  readonly creatorID: string;
  readonly creator?: User;
  readonly arbitrations?: (PlanArbitration | null)[];
  readonly invitees?: (Invitee | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Plan, PlanMetaData>);
  static copyOf(source: Plan, mutator: (draft: MutableModel<Plan, PlanMetaData>) => MutableModel<Plan, PlanMetaData> | void): Plan;
}

export declare class PlanArbitration {
  readonly id: string;
  readonly stat?: Status | keyof typeof Status;
  readonly original_description?: string;
  readonly proposed_description?: string;
  readonly value_count?: number;
  readonly planID?: string;
  readonly planArbitrationsId?: string;
  readonly createdBy?: Invitee;
  readonly plan?: Plan;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PlanArbitration, PlanArbitrationMetaData>);
  static copyOf(source: PlanArbitration, mutator: (draft: MutableModel<PlanArbitration, PlanArbitrationMetaData>) => MutableModel<PlanArbitration, PlanArbitrationMetaData> | void): PlanArbitration;
}

export declare class Invitee {
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly status: Status | keyof typeof Status;
  readonly pushToken?: string;
  readonly planID?: string;
  readonly planInviteesId?: string;
  readonly plan?: Plan;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Invitee, InviteeMetaData>);
  static copyOf(source: Invitee, mutator: (draft: MutableModel<Invitee, InviteeMetaData>) => MutableModel<Invitee, InviteeMetaData> | void): Invitee;
}