/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
          planCreatorId
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
        planCreatorId
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
          planCreatorId
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
        planCreatorId
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
          planCreatorId
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
        planCreatorId
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
export const createAvailability = /* GraphQL */ `
  mutation CreateAvailability(
    $input: CreateAvailabilityInput!
    $condition: ModelAvailabilityConditionInput
  ) {
    createAvailability(input: $input, condition: $condition) {
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
export const updateAvailability = /* GraphQL */ `
  mutation UpdateAvailability(
    $input: UpdateAvailabilityInput!
    $condition: ModelAvailabilityConditionInput
  ) {
    updateAvailability(input: $input, condition: $condition) {
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
export const deleteAvailability = /* GraphQL */ `
  mutation DeleteAvailability(
    $input: DeleteAvailabilityInput!
    $condition: ModelAvailabilityConditionInput
  ) {
    deleteAvailability(input: $input, condition: $condition) {
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
      notificationsSent {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      notificationsRecieved {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
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
      notificationsSent {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      notificationsRecieved {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
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
      notificationsSent {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      notificationsRecieved {
        items {
          id
          senderType
          notificationID
          senderID
          recipientID
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
      sender {
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
      }
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
      sender {
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
      }
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
      sender {
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
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
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
      }
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
