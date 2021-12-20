import { ModelInit, MutableModel, PersistentModelConstructor } from '@aws-amplify/datastore';

export enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

type PlanMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

type AvailabilityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

type PlanArbitrationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

type InviteeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

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
  static copyOf(
    source: Plan,
    mutator: (draft: MutableModel<Plan, PlanMetaData>) => MutableModel<Plan, PlanMetaData> | void,
  ): Plan;
}

export declare class User {
  readonly id: string;
  readonly phoneNumber: string;
  readonly name: string;
  readonly pushToken: string;
  readonly friends?: string;
  readonly email?: string;
  readonly availability?: Availability;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(
    source: User,
    mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void,
  ): User;
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
  static copyOf(
    source: Availability,
    mutator: (
      draft: MutableModel<Availability, AvailabilityMetaData>,
    ) => MutableModel<Availability, AvailabilityMetaData> | void,
  ): Availability;
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
  static copyOf(
    source: PlanArbitration,
    mutator: (
      draft: MutableModel<PlanArbitration, PlanArbitrationMetaData>,
    ) => MutableModel<PlanArbitration, PlanArbitrationMetaData> | void,
  ): PlanArbitration;
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
  static copyOf(
    source: Invitee,
    mutator: (draft: MutableModel<Invitee, InviteeMetaData>) => MutableModel<Invitee, InviteeMetaData> | void,
  ): Invitee;
}
