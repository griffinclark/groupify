/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      phoneNumber
      email
      name
      pushToken
      friends
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      userContacts {
        items {
          id
          phoneNumber
          name
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
      email
      name
      pushToken
      friends
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      userContacts {
        items {
          id
          phoneNumber
          name
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
      email
      name
      pushToken
      friends
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      userContacts {
        items {
          id
          phoneNumber
          name
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
export const onCreateUserContact = /* GraphQL */ `
  subscription OnCreateUserContact {
    onCreateUserContact {
      id
      phoneNumber
      name
      userID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserContact = /* GraphQL */ `
  subscription OnUpdateUserContact {
    onUpdateUserContact {
      id
      phoneNumber
      name
      userID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserContact = /* GraphQL */ `
  subscription OnDeleteUserContact {
    onDeleteUserContact {
      id
      phoneNumber
      name
      userID
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      invitees {
        items {
          id
          name
          phoneNumber
          status
          planID
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      invitees {
        items {
          id
          name
          phoneNumber
          status
          planID
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      invitees {
        items {
          id
          name
          phoneNumber
          status
          planID
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
export const onCreateInvitee = /* GraphQL */ `
  subscription OnCreateInvitee {
    onCreateInvitee {
      id
      name
      phoneNumber
      status
      planID
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
      planID
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
      planID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
