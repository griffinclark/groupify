/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInterest = /* GraphQL */ `
  subscription OnCreateInterest {
    onCreateInterest {
      id
      userID
      interest
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onUpdateInterest = /* GraphQL */ `
  subscription OnUpdateInterest {
    onUpdateInterest {
      id
      userID
      interest
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onDeleteInterest = /* GraphQL */ `
  subscription OnDeleteInterest {
    onDeleteInterest {
      id
      userID
      interest
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onCreateNotificationFromTo = /* GraphQL */ `
  subscription OnCreateNotificationFromTo {
    onCreateNotificationFromTo {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onUpdateNotificationFromTo = /* GraphQL */ `
  subscription OnUpdateNotificationFromTo {
    onUpdateNotificationFromTo {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onDeleteNotificationFromTo = /* GraphQL */ `
  subscription OnDeleteNotificationFromTo {
    onDeleteNotificationFromTo {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
export const onCreatePlan = /* GraphQL */ `
  subscription OnCreatePlan {
    onCreatePlan {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onUpdatePlan = /* GraphQL */ `
  subscription OnUpdatePlan {
    onUpdatePlan {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onDeletePlan = /* GraphQL */ `
  subscription OnDeletePlan {
    onDeletePlan {
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
        interests {
          nextToken
          startedAt
        }
        notificationsSent {
          nextToken
          startedAt
        }
        notificationsRecieved {
          nextToken
          startedAt
        }
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
      }
    }
  }
`;
export const onCreatePlanArbitration = /* GraphQL */ `
  subscription OnCreatePlanArbitration {
    onCreatePlanArbitration {
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
export const onUpdatePlanArbitration = /* GraphQL */ `
  subscription OnUpdatePlanArbitration {
    onUpdatePlanArbitration {
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
export const onDeletePlanArbitration = /* GraphQL */ `
  subscription OnDeletePlanArbitration {
    onDeletePlanArbitration {
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
export const onCreateInvitee = /* GraphQL */ `
  subscription OnCreateInvitee {
    onCreateInvitee {
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
export const onUpdateInvitee = /* GraphQL */ `
  subscription OnUpdateInvitee {
    onUpdateInvitee {
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
export const onDeleteInvitee = /* GraphQL */ `
  subscription OnDeleteInvitee {
    onDeleteInvitee {
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
export const onCreateAvailability = /* GraphQL */ `
  subscription OnCreateAvailability {
    onCreateAvailability {
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
export const onUpdateAvailability = /* GraphQL */ `
  subscription OnUpdateAvailability {
    onUpdateAvailability {
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
export const onDeleteAvailability = /* GraphQL */ `
  subscription OnDeleteAvailability {
    onDeleteAvailability {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      interests {
        items {
          id
          userID
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
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
      interests {
        items {
          id
          userID
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
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      interests {
        items {
          id
          userID
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
    }
  }
`;
