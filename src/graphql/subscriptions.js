/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
