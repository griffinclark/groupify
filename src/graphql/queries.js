/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncPlans = /* GraphQL */ `
  query SyncPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        description
        location
        placeID
        date
        time
        creatorID
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        arbitrations {
          nextToken
          startedAt
        }
        invitees {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPlan = /* GraphQL */ `
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
      id
      title
      description
      location
      placeID
      date
      time
      creatorID
      creator {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        availability {
          id
          Sunday
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      arbitrations {
        items {
          id
          stat
          original_description
          proposed_description
          value_count
          planID
          planArbitrationsId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      invitees {
        items {
          id
          name
          phoneNumber
          status
          pushToken
          planID
          planInviteesId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        location
        placeID
        date
        time
        creatorID
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        arbitrations {
          nextToken
          startedAt
        }
        invitees {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPlanArbitrations = /* GraphQL */ `
  query SyncPlanArbitrations(
    $filter: ModelPlanArbitrationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlanArbitrations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        stat
        original_description
        proposed_description
        value_count
        planID
        planArbitrationsId
        createdBy {
          id
          name
          phoneNumber
          status
          pushToken
          planID
          planInviteesId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getPlanArbitration = /* GraphQL */ `
  query GetPlanArbitration($id: ID!) {
    getPlanArbitration(id: $id) {
      id
      stat
      original_description
      proposed_description
      value_count
      planID
      planArbitrationsId
      createdBy {
        id
        name
        phoneNumber
        status
        pushToken
        planID
        planInviteesId
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      plan {
        id
        title
        description
        location
        placeID
        date
        time
        creatorID
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        arbitrations {
          nextToken
          startedAt
        }
        invitees {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listPlanArbitrations = /* GraphQL */ `
  query ListPlanArbitrations(
    $filter: ModelPlanArbitrationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlanArbitrations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stat
        original_description
        proposed_description
        value_count
        planID
        planArbitrationsId
        createdBy {
          id
          name
          phoneNumber
          status
          pushToken
          planID
          planInviteesId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncInvitees = /* GraphQL */ `
  query SyncInvitees(
    $filter: ModelInviteeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInvitees(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        phoneNumber
        status
        pushToken
        planID
        planInviteesId
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getInvitee = /* GraphQL */ `
  query GetInvitee($id: ID!) {
    getInvitee(id: $id) {
      id
      name
      phoneNumber
      status
      pushToken
      planID
      planInviteesId
      plan {
        id
        title
        description
        location
        placeID
        date
        time
        creatorID
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        arbitrations {
          nextToken
          startedAt
        }
        invitees {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listInvitees = /* GraphQL */ `
  query ListInvitees(
    $filter: ModelInviteeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phoneNumber
        status
        pushToken
        planID
        planInviteesId
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAvailabilities = /* GraphQL */ `
  query SyncAvailabilities(
    $filter: ModelAvailabilityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAvailabilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Sunday
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAvailability = /* GraphQL */ `
  query GetAvailability($id: ID!) {
    getAvailability(id: $id) {
      id
      Sunday
      Monday
      Tuesday
      Wednesday
      Thursday
      Friday
      Saturday
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listAvailabilitys = /* GraphQL */ `
  query ListAvailabilitys(
    $filter: ModelAvailabilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAvailabilitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Sunday
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        availability {
          id
          Sunday
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      phoneNumber
      name
      pushToken
      friends
      email
      availability {
        id
        Sunday
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        availability {
          id
          Sunday
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const inviteeByPhoneNUmber = /* GraphQL */ `
  query InviteeByPhoneNUmber(
    $phoneNumber: AWSPhone
    $sortDirection: ModelSortDirection
    $filter: ModelInviteeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inviteeByPhoneNUmber(
      phoneNumber: $phoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phoneNumber
        status
        pushToken
        planID
        planInviteesId
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const inviteesByPlan = /* GraphQL */ `
  query InviteesByPlan(
    $planID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelInviteeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inviteesByPlan(
      planID: $planID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phoneNumber
        status
        pushToken
        planID
        planInviteesId
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const usersByPhoneNumber = /* GraphQL */ `
  query UsersByPhoneNumber(
    $phoneNumber: AWSPhone
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByPhoneNumber(
      phoneNumber: $phoneNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        availability {
          id
          Sunday
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const usersByName = /* GraphQL */ `
  query UsersByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        availability {
          id
          Sunday
          Monday
          Tuesday
          Wednesday
          Thursday
          Friday
          Saturday
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
