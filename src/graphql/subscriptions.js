/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInterests = /* GraphQL */ `
  subscription OnCreateInterests {
    onCreateInterests {
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
export const onUpdateInterests = /* GraphQL */ `
  subscription OnUpdateInterests {
    onUpdateInterests {
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
export const onDeleteInterests = /* GraphQL */ `
  subscription OnDeleteInterests {
    onDeleteInterests {
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
export const onCreateAvailabilityTime = /* GraphQL */ `
  subscription OnCreateAvailabilityTime {
    onCreateAvailabilityTime {
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
export const onUpdateAvailabilityTime = /* GraphQL */ `
  subscription OnUpdateAvailabilityTime {
    onUpdateAvailabilityTime {
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
export const onDeleteAvailabilityTime = /* GraphQL */ `
  subscription OnDeleteAvailabilityTime {
    onDeleteAvailabilityTime {
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
export const onCreateNotificationFromTo = /* GraphQL */ `
  subscription OnCreateNotificationFromTo {
    onCreateNotificationFromTo {
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
export const onUpdateNotificationFromTo = /* GraphQL */ `
  subscription OnUpdateNotificationFromTo {
    onUpdateNotificationFromTo {
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
export const onDeleteNotificationFromTo = /* GraphQL */ `
  subscription OnDeleteNotificationFromTo {
    onDeleteNotificationFromTo {
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
