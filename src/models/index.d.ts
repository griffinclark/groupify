import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum NotificationType {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  INVITED = "INVITED"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NONBINARY = "NONBINARY",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"
}

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



type InterestsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AvailabilityTimeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NotificationFromToMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NotificationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
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

export declare class Interests {
  readonly id: string;
  readonly interest?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Interests, InterestsMetaData>);
  static copyOf(source: Interests, mutator: (draft: MutableModel<Interests, InterestsMetaData>) => MutableModel<Interests, InterestsMetaData> | void): Interests;
}

export declare class AvailabilityTime {
  readonly id: string;
  readonly Mon?: (string | null)[] | null;
  readonly Tues?: (string | null)[] | null;
  readonly Wed?: (string | null)[] | null;
  readonly Thur?: (string | null)[] | null;
  readonly Fri?: (string | null)[] | null;
  readonly Sat?: (string | null)[] | null;
  readonly Sun?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<AvailabilityTime, AvailabilityTimeMetaData>);
  static copyOf(source: AvailabilityTime, mutator: (draft: MutableModel<AvailabilityTime, AvailabilityTimeMetaData>) => MutableModel<AvailabilityTime, AvailabilityTimeMetaData> | void): AvailabilityTime;
}

export declare class NotificationFromTo {
  readonly id: string;
  readonly senderType?: Sender | keyof typeof Sender | null;
  readonly senderID?: string | null;
  readonly recipientID: string;
  readonly notification: Notification;
  readonly sender?: User | null;
  readonly recipient: User;
  readonly read?: boolean | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NotificationFromTo, NotificationFromToMetaData>);
  static copyOf(source: NotificationFromTo, mutator: (draft: MutableModel<NotificationFromTo, NotificationFromToMetaData>) => MutableModel<NotificationFromTo, NotificationFromToMetaData> | void): NotificationFromTo;
}

export declare class Notification {
  readonly id: string;
  readonly body: string;
  readonly data?: string | null;
  readonly ttl?: number | null;
  readonly messageSubtitle?: string | null;
  readonly sound?: boolean | null;
  readonly channel?: string | null;
  readonly recipients?: (NotificationFromTo | null)[] | null;
  readonly notificationType?: NotificationType | keyof typeof NotificationType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notification, NotificationMetaData>);
  static copyOf(source: Notification, mutator: (draft: MutableModel<Notification, NotificationMetaData>) => MutableModel<Notification, NotificationMetaData> | void): Notification;
}

export declare class User {
  readonly id: string;
  readonly phoneNumber: string;
  readonly name: string;
  readonly pushToken: string;
  readonly friends?: string | null;
  readonly email?: string | null;
  readonly availability?: AvailabilityTime | null;
  readonly notificationsSent?: (NotificationFromTo | null)[] | null;
  readonly age?: string | null;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly notificationsReceived?: (NotificationFromTo | null)[] | null;
  readonly Interest?: Interests | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Plan {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly location?: string | null;
  readonly placeID?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly creatorID: string;
  readonly creator?: User | null;
  readonly arbitrations?: (PlanArbitration | null)[] | null;
  readonly invitees?: (Invitee | null)[] | null;
  readonly notification?: Notification | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Plan, PlanMetaData>);
  static copyOf(source: Plan, mutator: (draft: MutableModel<Plan, PlanMetaData>) => MutableModel<Plan, PlanMetaData> | void): Plan;
}

export declare class PlanArbitration {
  readonly id: string;
  readonly stat?: Status | keyof typeof Status | null;
  readonly original_description?: string | null;
  readonly proposed_description?: string | null;
  readonly value_count?: number | null;
  readonly planID?: string | null;
  readonly planArbitrationsId?: string | null;
  readonly createdBy?: Invitee | null;
  readonly plan?: Plan | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PlanArbitration, PlanArbitrationMetaData>);
  static copyOf(source: PlanArbitration, mutator: (draft: MutableModel<PlanArbitration, PlanArbitrationMetaData>) => MutableModel<PlanArbitration, PlanArbitrationMetaData> | void): PlanArbitration;
}

export declare class Invitee {
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly status: Status | keyof typeof Status;
  readonly pushToken?: string | null;
  readonly planID?: string | null;
  readonly planInviteesId?: string | null;
  readonly plan?: Plan | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Invitee, InviteeMetaData>);
  static copyOf(source: Invitee, mutator: (draft: MutableModel<Invitee, InviteeMetaData>) => MutableModel<Invitee, InviteeMetaData> | void): Invitee;
}