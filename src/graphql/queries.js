/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInterests = /* GraphQL */ `
  query GetInterests($id: ID!) {
    getInterests(id: $id) {
      id
      interest
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listInterestss = /* GraphQL */ `
  query ListInterestss(
    $filter: ModelInterestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        interest
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
export const syncInterests = /* GraphQL */ `
  query SyncInterests(
    $filter: ModelInterestsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInterests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        interest
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
export const getAvailabilityTime = /* GraphQL */ `
  query GetAvailabilityTime($id: ID!) {
    getAvailabilityTime(id: $id) {
      id
      Mon
      Tues
      Wed
      Thur
      Fri
      Sat
      Sun
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listAvailabilityTimes = /* GraphQL */ `
  query ListAvailabilityTimes(
    $filter: ModelAvailabilityTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAvailabilityTimes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Mon
        Tues
        Wed
        Thur
        Fri
        Sat
        Sun
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
export const syncAvailabilityTimes = /* GraphQL */ `
  query SyncAvailabilityTimes(
    $filter: ModelAvailabilityTimeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAvailabilityTimes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        Mon
        Tues
        Wed
        Thur
        Fri
        Sat
        Sun
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
export const getNotificationFromTo = /* GraphQL */ `
  query GetNotificationFromTo($id: ID!) {
    getNotificationFromTo(id: $id) {
      id
      senderType
      notificationID
      senderID
      recipientID
      read
      userID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      notification {
        id
        body
        data
        ttl
        messageSubtitle
        sound
        channel
        notificationType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        recipients {
          nextToken
          startedAt
        }
      }
      sender {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
      }
      recipient {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listNotificationFromTos = /* GraphQL */ `
  query ListNotificationFromTos(
    $filter: ModelNotificationFromToFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationFromTos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderType
        notificationID
        senderID
        recipientID
        read
        userID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        notification {
          id
          body
          data
          ttl
          messageSubtitle
          sound
          channel
          notificationType
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        sender {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        recipient {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotificationFromTos = /* GraphQL */ `
  query SyncNotificationFromTos(
    $filter: ModelNotificationFromToFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotificationFromTos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        senderType
        notificationID
        senderID
        recipientID
        read
        userID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        notification {
          id
          body
          data
          ttl
          messageSubtitle
          sound
          channel
          notificationType
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        sender {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        recipient {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      body
      data
      ttl
      messageSubtitle
      sound
      channel
      notificationType
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      recipients {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
          read
          userID
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
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        body
        data
        ttl
        messageSubtitle
        sound
        channel
        notificationType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        recipients {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        body
        data
        ttl
        messageSubtitle
        sound
        channel
        notificationType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        recipients {
          nextToken
          startedAt
        }
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
      planCreatorId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      notification {
        id
        body
        data
        ttl
        messageSubtitle
        sound
        channel
        notificationType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        recipients {
          nextToken
          startedAt
        }
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
      creator {
        id
        phoneNumber
        name
        pushToken
        friends
        email
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
      }
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
        planCreatorId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        notification {
          id
          body
          data
          ttl
          messageSubtitle
          sound
          channel
          notificationType
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
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
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
        planCreatorId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        notification {
          id
          body
          data
          ttl
          messageSubtitle
          sound
          channel
          notificationType
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
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      plan {
        id
        title
        description
        location
        placeID
        date
        time
        creatorID
        planCreatorId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        notification {
          id
          body
          data
          ttl
          messageSubtitle
          sound
          channel
          notificationType
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
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
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
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          planCreatorId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          planCreatorId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          planCreatorId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      plan {
        id
        title
        description
        location
        placeID
        date
        time
        creatorID
        planCreatorId
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        notification {
          id
          body
          data
          ttl
          messageSubtitle
          sound
          channel
          notificationType
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
        creator {
          id
          phoneNumber
          name
          pushToken
          friends
          email
          age
          gender
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          planCreatorId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        plan {
          id
          title
          description
          location
          placeID
          date
          time
          creatorID
          planCreatorId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
      age
      gender
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Interest {
        id
        interest
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      availability {
        id
        Mon
        Tues
        Wed
        Thur
        Fri
        Sat
        Sun
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      notificationsSent {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
          read
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      notificationsReceived {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
          read
          userID
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
        name
        phoneNumber
        pushToken
        friends
        email
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
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
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
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
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
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
        age
        gender
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Interest {
          id
          interest
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        availability {
          id
          Mon
          Tues
          Wed
          Thur
          Fri
          Sat
          Sun
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsReceived {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
