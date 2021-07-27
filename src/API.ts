/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  phoneNumber: string,
  email: string,
  name: string,
  pushToken: string,
  friends?: Array< string | null > | null,
  _version?: number | null,
  userAvailabilityId?: string | null,
};

export type ModelUserConditionInput = {
  phoneNumber?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  pushToken?: ModelStringInput | null,
  friends?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  phoneNumber: string,
  email: string,
  name: string,
  pushToken: string,
  friends?: Array< string | null > | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  userContacts?: ModelUserContactConnection | null,
  availability?: Availability | null,
};

export type ModelUserContactConnection = {
  __typename: "ModelUserContactConnection",
  items?:  Array<UserContact | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UserContact = {
  __typename: "UserContact",
  id: string,
  phoneNumber: string,
  name?: string | null,
  userID?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type Availability = {
  __typename: "Availability",
  id: string,
  Sunday?: Array< string | null > | null,
  Monday?: Array< string | null > | null,
  Tuesday?: Array< string | null > | null,
  Wednesday?: Array< string | null > | null,
  Thursday?: Array< string | null > | null,
  Friday?: Array< string | null > | null,
  Saturday?: Array< string | null > | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  phoneNumber?: string | null,
  email?: string | null,
  name?: string | null,
  pushToken?: string | null,
  friends?: Array< string | null > | null,
  _version?: number | null,
  userAvailabilityId?: string | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserContactInput = {
  id?: string | null,
  phoneNumber: string,
  name?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type ModelUserContactConditionInput = {
  phoneNumber?: ModelStringInput | null,
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUserContactConditionInput | null > | null,
  or?: Array< ModelUserContactConditionInput | null > | null,
  not?: ModelUserContactConditionInput | null,
};

export type UpdateUserContactInput = {
  id: string,
  phoneNumber?: string | null,
  name?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteUserContactInput = {
  id: string,
  _version?: number | null,
};

export type CreateAvailabilityInput = {
  id?: string | null,
  Sunday?: Array< string | null > | null,
  Monday?: Array< string | null > | null,
  Tuesday?: Array< string | null > | null,
  Wednesday?: Array< string | null > | null,
  Thursday?: Array< string | null > | null,
  Friday?: Array< string | null > | null,
  Saturday?: Array< string | null > | null,
  _version?: number | null,
};

export type ModelAvailabilityConditionInput = {
  Sunday?: ModelStringInput | null,
  Monday?: ModelStringInput | null,
  Tuesday?: ModelStringInput | null,
  Wednesday?: ModelStringInput | null,
  Thursday?: ModelStringInput | null,
  Friday?: ModelStringInput | null,
  Saturday?: ModelStringInput | null,
  and?: Array< ModelAvailabilityConditionInput | null > | null,
  or?: Array< ModelAvailabilityConditionInput | null > | null,
  not?: ModelAvailabilityConditionInput | null,
};

export type UpdateAvailabilityInput = {
  id: string,
  Sunday?: Array< string | null > | null,
  Monday?: Array< string | null > | null,
  Tuesday?: Array< string | null > | null,
  Wednesday?: Array< string | null > | null,
  Thursday?: Array< string | null > | null,
  Friday?: Array< string | null > | null,
  Saturday?: Array< string | null > | null,
  _version?: number | null,
};

export type DeleteAvailabilityInput = {
  id: string,
  _version?: number | null,
};

export type CreatePlanInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  location?: string | null,
  placeID?: string | null,
  date?: string | null,
  time?: string | null,
  _version?: number | null,
};

export type ModelPlanConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  placeID?: ModelStringInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelPlanConditionInput | null > | null,
  or?: Array< ModelPlanConditionInput | null > | null,
  not?: ModelPlanConditionInput | null,
};

export type Plan = {
  __typename: "Plan",
  id: string,
  title: string,
  description?: string | null,
  location?: string | null,
  placeID?: string | null,
  date?: string | null,
  time?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  invitees?: ModelInviteeConnection | null,
};

export type ModelInviteeConnection = {
  __typename: "ModelInviteeConnection",
  items?:  Array<Invitee | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Invitee = {
  __typename: "Invitee",
  id: string,
  name: string,
  phoneNumber: string,
  status: Status,
  planID?: string | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
};

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}


export type UpdatePlanInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  location?: string | null,
  placeID?: string | null,
  date?: string | null,
  time?: string | null,
  _version?: number | null,
};

export type DeletePlanInput = {
  id: string,
  _version?: number | null,
};

export type CreateInviteeInput = {
  id?: string | null,
  name: string,
  phoneNumber: string,
  status: Status,
  planID?: string | null,
  _version?: number | null,
};

export type ModelInviteeConditionInput = {
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  status?: ModelStatusInput | null,
  planID?: ModelIDInput | null,
  and?: Array< ModelInviteeConditionInput | null > | null,
  or?: Array< ModelInviteeConditionInput | null > | null,
  not?: ModelInviteeConditionInput | null,
};

export type ModelStatusInput = {
  eq?: Status | null,
  ne?: Status | null,
};

export type UpdateInviteeInput = {
  id: string,
  name?: string | null,
  phoneNumber?: string | null,
  status?: Status | null,
  planID?: string | null,
  _version?: number | null,
};

export type DeleteInviteeInput = {
  id: string,
  _version?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  phoneNumber?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  pushToken?: ModelStringInput | null,
  friends?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserContactFilterInput = {
  id?: ModelIDInput | null,
  phoneNumber?: ModelStringInput | null,
  name?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelUserContactFilterInput | null > | null,
  or?: Array< ModelUserContactFilterInput | null > | null,
  not?: ModelUserContactFilterInput | null,
};

export type ModelAvailabilityFilterInput = {
  id?: ModelIDInput | null,
  Sunday?: ModelStringInput | null,
  Monday?: ModelStringInput | null,
  Tuesday?: ModelStringInput | null,
  Wednesday?: ModelStringInput | null,
  Thursday?: ModelStringInput | null,
  Friday?: ModelStringInput | null,
  Saturday?: ModelStringInput | null,
  and?: Array< ModelAvailabilityFilterInput | null > | null,
  or?: Array< ModelAvailabilityFilterInput | null > | null,
  not?: ModelAvailabilityFilterInput | null,
};

export type ModelAvailabilityConnection = {
  __typename: "ModelAvailabilityConnection",
  items?:  Array<Availability | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelPlanFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  placeID?: ModelStringInput | null,
  date?: ModelStringInput | null,
  time?: ModelStringInput | null,
  and?: Array< ModelPlanFilterInput | null > | null,
  or?: Array< ModelPlanFilterInput | null > | null,
  not?: ModelPlanFilterInput | null,
};

export type ModelPlanConnection = {
  __typename: "ModelPlanConnection",
  items?:  Array<Plan | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelInviteeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  status?: ModelStatusInput | null,
  planID?: ModelIDInput | null,
  and?: Array< ModelInviteeFilterInput | null > | null,
  or?: Array< ModelInviteeFilterInput | null > | null,
  not?: ModelInviteeFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateUserContactMutationVariables = {
  input: CreateUserContactInput,
  condition?: ModelUserContactConditionInput | null,
};

export type CreateUserContactMutation = {
  createUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserContactMutationVariables = {
  input: UpdateUserContactInput,
  condition?: ModelUserContactConditionInput | null,
};

export type UpdateUserContactMutation = {
  updateUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserContactMutationVariables = {
  input: DeleteUserContactInput,
  condition?: ModelUserContactConditionInput | null,
};

export type DeleteUserContactMutation = {
  deleteUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAvailabilityMutationVariables = {
  input: CreateAvailabilityInput,
  condition?: ModelAvailabilityConditionInput | null,
};

export type CreateAvailabilityMutation = {
  createAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAvailabilityMutationVariables = {
  input: UpdateAvailabilityInput,
  condition?: ModelAvailabilityConditionInput | null,
};

export type UpdateAvailabilityMutation = {
  updateAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAvailabilityMutationVariables = {
  input: DeleteAvailabilityInput,
  condition?: ModelAvailabilityConditionInput | null,
};

export type DeleteAvailabilityMutation = {
  deleteAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePlanMutationVariables = {
  input: CreatePlanInput,
  condition?: ModelPlanConditionInput | null,
};

export type CreatePlanMutation = {
  createPlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type UpdatePlanMutationVariables = {
  input: UpdatePlanInput,
  condition?: ModelPlanConditionInput | null,
};

export type UpdatePlanMutation = {
  updatePlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type DeletePlanMutationVariables = {
  input: DeletePlanInput,
  condition?: ModelPlanConditionInput | null,
};

export type DeletePlanMutation = {
  deletePlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type CreateInviteeMutationVariables = {
  input: CreateInviteeInput,
  condition?: ModelInviteeConditionInput | null,
};

export type CreateInviteeMutation = {
  createInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInviteeMutationVariables = {
  input: UpdateInviteeInput,
  condition?: ModelInviteeConditionInput | null,
};

export type UpdateInviteeMutation = {
  updateInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInviteeMutationVariables = {
  input: DeleteInviteeInput,
  condition?: ModelInviteeConditionInput | null,
};

export type DeleteInviteeMutation = {
  deleteInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      phoneNumber: string,
      email: string,
      name: string,
      pushToken: string,
      friends?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      userContacts?:  {
        __typename: "ModelUserContactConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      availability?:  {
        __typename: "Availability",
        id: string,
        Sunday?: Array< string | null > | null,
        Monday?: Array< string | null > | null,
        Tuesday?: Array< string | null > | null,
        Wednesday?: Array< string | null > | null,
        Thursday?: Array< string | null > | null,
        Friday?: Array< string | null > | null,
        Saturday?: Array< string | null > | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByEmailQueryVariables = {
  email?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByEmailQuery = {
  usersByEmail?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      phoneNumber: string,
      email: string,
      name: string,
      pushToken: string,
      friends?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      userContacts?:  {
        __typename: "ModelUserContactConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      availability?:  {
        __typename: "Availability",
        id: string,
        Sunday?: Array< string | null > | null,
        Monday?: Array< string | null > | null,
        Tuesday?: Array< string | null > | null,
        Wednesday?: Array< string | null > | null,
        Thursday?: Array< string | null > | null,
        Friday?: Array< string | null > | null,
        Saturday?: Array< string | null > | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByNameQuery = {
  usersByName?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      phoneNumber: string,
      email: string,
      name: string,
      pushToken: string,
      friends?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      userContacts?:  {
        __typename: "ModelUserContactConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      availability?:  {
        __typename: "Availability",
        id: string,
        Sunday?: Array< string | null > | null,
        Monday?: Array< string | null > | null,
        Tuesday?: Array< string | null > | null,
        Wednesday?: Array< string | null > | null,
        Thursday?: Array< string | null > | null,
        Friday?: Array< string | null > | null,
        Saturday?: Array< string | null > | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      phoneNumber: string,
      email: string,
      name: string,
      pushToken: string,
      friends?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      userContacts?:  {
        __typename: "ModelUserContactConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      availability?:  {
        __typename: "Availability",
        id: string,
        Sunday?: Array< string | null > | null,
        Monday?: Array< string | null > | null,
        Tuesday?: Array< string | null > | null,
        Wednesday?: Array< string | null > | null,
        Thursday?: Array< string | null > | null,
        Friday?: Array< string | null > | null,
        Saturday?: Array< string | null > | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserContactQueryVariables = {
  id: string,
};

export type GetUserContactQuery = {
  getUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserContactsQueryVariables = {
  filter?: ModelUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserContactsQuery = {
  listUserContacts?:  {
    __typename: "ModelUserContactConnection",
    items?:  Array< {
      __typename: "UserContact",
      id: string,
      phoneNumber: string,
      name?: string | null,
      userID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByPhoneNumberQueryVariables = {
  phoneNumber?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByPhoneNumberQuery = {
  usersByPhoneNumber?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      phoneNumber: string,
      email: string,
      name: string,
      pushToken: string,
      friends?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      userContacts?:  {
        __typename: "ModelUserContactConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      availability?:  {
        __typename: "Availability",
        id: string,
        Sunday?: Array< string | null > | null,
        Monday?: Array< string | null > | null,
        Tuesday?: Array< string | null > | null,
        Wednesday?: Array< string | null > | null,
        Thursday?: Array< string | null > | null,
        Friday?: Array< string | null > | null,
        Saturday?: Array< string | null > | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserContactsQueryVariables = {
  filter?: ModelUserContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserContactsQuery = {
  syncUserContacts?:  {
    __typename: "ModelUserContactConnection",
    items?:  Array< {
      __typename: "UserContact",
      id: string,
      phoneNumber: string,
      name?: string | null,
      userID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetAvailabilityQueryVariables = {
  id: string,
};

export type GetAvailabilityQuery = {
  getAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAvailabilitysQueryVariables = {
  filter?: ModelAvailabilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAvailabilitysQuery = {
  listAvailabilitys?:  {
    __typename: "ModelAvailabilityConnection",
    items?:  Array< {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAvailabilitiesQueryVariables = {
  filter?: ModelAvailabilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAvailabilitiesQuery = {
  syncAvailabilities?:  {
    __typename: "ModelAvailabilityConnection",
    items?:  Array< {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPlanQueryVariables = {
  id: string,
};

export type GetPlanQuery = {
  getPlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type ListPlansQueryVariables = {
  filter?: ModelPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlansQuery = {
  listPlans?:  {
    __typename: "ModelPlanConnection",
    items?:  Array< {
      __typename: "Plan",
      id: string,
      title: string,
      description?: string | null,
      location?: string | null,
      placeID?: string | null,
      date?: string | null,
      time?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      invitees?:  {
        __typename: "ModelInviteeConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPlansQueryVariables = {
  filter?: ModelPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPlansQuery = {
  syncPlans?:  {
    __typename: "ModelPlanConnection",
    items?:  Array< {
      __typename: "Plan",
      id: string,
      title: string,
      description?: string | null,
      location?: string | null,
      placeID?: string | null,
      date?: string | null,
      time?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      invitees?:  {
        __typename: "ModelInviteeConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetInviteeQueryVariables = {
  id: string,
};

export type GetInviteeQuery = {
  getInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInviteesQueryVariables = {
  filter?: ModelInviteeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInviteesQuery = {
  listInvitees?:  {
    __typename: "ModelInviteeConnection",
    items?:  Array< {
      __typename: "Invitee",
      id: string,
      name: string,
      phoneNumber: string,
      status: Status,
      planID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type InviteeByPhoneNUmberQueryVariables = {
  phoneNumber?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInviteeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InviteeByPhoneNUmberQuery = {
  inviteeByPhoneNUmber?:  {
    __typename: "ModelInviteeConnection",
    items?:  Array< {
      __typename: "Invitee",
      id: string,
      name: string,
      phoneNumber: string,
      status: Status,
      planID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncInviteesQueryVariables = {
  filter?: ModelInviteeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncInviteesQuery = {
  syncInvitees?:  {
    __typename: "ModelInviteeConnection",
    items?:  Array< {
      __typename: "Invitee",
      id: string,
      name: string,
      phoneNumber: string,
      status: Status,
      planID?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    phoneNumber: string,
    email: string,
    name: string,
    pushToken: string,
    friends?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    userContacts?:  {
      __typename: "ModelUserContactConnection",
      items?:  Array< {
        __typename: "UserContact",
        id: string,
        phoneNumber: string,
        name?: string | null,
        userID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?:  {
      __typename: "Availability",
      id: string,
      Sunday?: Array< string | null > | null,
      Monday?: Array< string | null > | null,
      Tuesday?: Array< string | null > | null,
      Wednesday?: Array< string | null > | null,
      Thursday?: Array< string | null > | null,
      Friday?: Array< string | null > | null,
      Saturday?: Array< string | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateUserContactSubscription = {
  onCreateUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserContactSubscription = {
  onUpdateUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserContactSubscription = {
  onDeleteUserContact?:  {
    __typename: "UserContact",
    id: string,
    phoneNumber: string,
    name?: string | null,
    userID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAvailabilitySubscription = {
  onCreateAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAvailabilitySubscription = {
  onUpdateAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAvailabilitySubscription = {
  onDeleteAvailability?:  {
    __typename: "Availability",
    id: string,
    Sunday?: Array< string | null > | null,
    Monday?: Array< string | null > | null,
    Tuesday?: Array< string | null > | null,
    Wednesday?: Array< string | null > | null,
    Thursday?: Array< string | null > | null,
    Friday?: Array< string | null > | null,
    Saturday?: Array< string | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePlanSubscription = {
  onCreatePlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type OnUpdatePlanSubscription = {
  onUpdatePlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type OnDeletePlanSubscription = {
  onDeletePlan?:  {
    __typename: "Plan",
    id: string,
    title: string,
    description?: string | null,
    location?: string | null,
    placeID?: string | null,
    date?: string | null,
    time?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    invitees?:  {
      __typename: "ModelInviteeConnection",
      items?:  Array< {
        __typename: "Invitee",
        id: string,
        name: string,
        phoneNumber: string,
        status: Status,
        planID?: string | null,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
  } | null,
};

export type OnCreateInviteeSubscription = {
  onCreateInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInviteeSubscription = {
  onUpdateInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInviteeSubscription = {
  onDeleteInvitee?:  {
    __typename: "Invitee",
    id: string,
    name: string,
    phoneNumber: string,
    status: Status,
    planID?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
