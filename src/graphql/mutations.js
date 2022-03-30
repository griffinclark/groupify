/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInterests = /* GraphQL */ `
  mutation CreateInterests(
    $input: CreateInterestsInput!
    $condition: ModelInterestsConditionInput
  ) {
    createInterests(input: $input, condition: $condition) {
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
export const updateInterests = /* GraphQL */ `
  mutation UpdateInterests(
    $input: UpdateInterestsInput!
    $condition: ModelInterestsConditionInput
  ) {
    updateInterests(input: $input, condition: $condition) {
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
export const deleteInterests = /* GraphQL */ `
  mutation DeleteInterests(
    $input: DeleteInterestsInput!
    $condition: ModelInterestsConditionInput
  ) {
    deleteInterests(input: $input, condition: $condition) {
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
export const createAvailabilityTime = /* GraphQL */ `
  mutation CreateAvailabilityTime(
    $input: CreateAvailabilityTimeInput!
    $condition: ModelAvailabilityTimeConditionInput
  ) {
    createAvailabilityTime(input: $input, condition: $condition) {
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
export const updateAvailabilityTime = /* GraphQL */ `
  mutation UpdateAvailabilityTime(
    $input: UpdateAvailabilityTimeInput!
    $condition: ModelAvailabilityTimeConditionInput
  ) {
    updateAvailabilityTime(input: $input, condition: $condition) {
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
export const deleteAvailabilityTime = /* GraphQL */ `
  mutation DeleteAvailabilityTime(
    $input: DeleteAvailabilityTimeInput!
    $condition: ModelAvailabilityTimeConditionInput
  ) {
    deleteAvailabilityTime(input: $input, condition: $condition) {
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
export const createNotificationFromTo = /* GraphQL */ `
  mutation CreateNotificationFromTo(
    $input: CreateNotificationFromToInput!
    $condition: ModelNotificationFromToConditionInput
  ) {
    createNotificationFromTo(input: $input, condition: $condition) {
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
export const updateNotificationFromTo = /* GraphQL */ `
  mutation UpdateNotificationFromTo(
    $input: UpdateNotificationFromToInput!
    $condition: ModelNotificationFromToConditionInput
  ) {
    updateNotificationFromTo(input: $input, condition: $condition) {
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
export const deleteNotificationFromTo = /* GraphQL */ `
  mutation DeleteNotificationFromTo(
    $input: DeleteNotificationFromToInput!
    $condition: ModelNotificationFromToConditionInput
  ) {
    deleteNotificationFromTo(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createPlan = /* GraphQL */ `
  mutation CreatePlan(
    $input: CreatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    createPlan(input: $input, condition: $condition) {
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
export const updatePlan = /* GraphQL */ `
  mutation UpdatePlan(
    $input: UpdatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    updatePlan(input: $input, condition: $condition) {
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
export const deletePlan = /* GraphQL */ `
  mutation DeletePlan(
    $input: DeletePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    deletePlan(input: $input, condition: $condition) {
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
export const createPlanArbitration = /* GraphQL */ `
  mutation CreatePlanArbitration(
    $input: CreatePlanArbitrationInput!
    $condition: ModelPlanArbitrationConditionInput
  ) {
    createPlanArbitration(input: $input, condition: $condition) {
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
export const updatePlanArbitration = /* GraphQL */ `
  mutation UpdatePlanArbitration(
    $input: UpdatePlanArbitrationInput!
    $condition: ModelPlanArbitrationConditionInput
  ) {
    updatePlanArbitration(input: $input, condition: $condition) {
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
export const deletePlanArbitration = /* GraphQL */ `
  mutation DeletePlanArbitration(
    $input: DeletePlanArbitrationInput!
    $condition: ModelPlanArbitrationConditionInput
    
  ) {
    deletePlanArbitration(input: $input, condition: $condition) {
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
export const createInvitee = /* GraphQL */ `
  mutation CreateInvitee(
    $input: CreateInviteeInput!
    $condition: ModelInviteeConditionInput
  ) {
    createInvitee(input: $input, condition: $condition) {
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
export const updateInvitee = /* GraphQL */ `
  mutation UpdateInvitee(
    $input: UpdateInviteeInput!
    $condition: ModelInviteeConditionInput
  ) {
    updateInvitee(input: $input, condition: $condition) {
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
export const deleteInvitee = /* GraphQL */ `
  mutation DeleteInvitee(
    $input: DeleteInviteeInput!
    $condition: ModelInviteeConditionInput
  ) {
    deleteInvitee(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
