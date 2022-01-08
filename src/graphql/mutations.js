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
    }
  }
`;
