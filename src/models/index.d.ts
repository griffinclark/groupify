import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}



export declare class User {
  readonly id: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly name: string;
  readonly pushToken: string;
  readonly friends?: (string | null)[];
  readonly userContacts?: (UserContact | null)[];
  readonly availability?: Availability;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class UserContact {
  readonly id: string;
  readonly phoneNumber: string;
  readonly name: string;
  readonly userID: string;
  constructor(init: ModelInit<UserContact>);
  static copyOf(source: UserContact, mutator: (draft: MutableModel<UserContact>) => MutableModel<UserContact> | void): UserContact;
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
  constructor(init: ModelInit<Availability>);
  static copyOf(source: Availability, mutator: (draft: MutableModel<Availability>) => MutableModel<Availability> | void): Availability;
}

export declare class Plan {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly location?: string;
  readonly placeID?: string;
  readonly date?: string;
  readonly time?: string;
  readonly invitees?: (Invitee | null)[];
  readonly creator: string;
  constructor(init: ModelInit<Plan>);
  static copyOf(source: Plan, mutator: (draft: MutableModel<Plan>) => MutableModel<Plan> | void): Plan;
}

export declare class Invitee {
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly status: Status | keyof typeof Status;
  readonly planID: string;
  constructor(init: ModelInit<Invitee>);
  static copyOf(source: Invitee, mutator: (draft: MutableModel<Invitee>) => MutableModel<Invitee> | void): Invitee;
}