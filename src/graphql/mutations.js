/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEventDetail = /* GraphQL */ `
  mutation CreateEventDetail(
    $input: CreateEventDetailInput!
    $condition: ModelEventDetailConditionInput
  ) {
    createEventDetail(input: $input, condition: $condition) {
      id
      title
      creator
      desc
      location
      date
      createdAt
      invitees {
        items {
          id
          name
          status
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const updateEventDetail = /* GraphQL */ `
  mutation UpdateEventDetail(
    $input: UpdateEventDetailInput!
    $condition: ModelEventDetailConditionInput
  ) {
    updateEventDetail(input: $input, condition: $condition) {
      id
      title
      creator
      desc
      location
      date
      createdAt
      invitees {
        items {
          id
          name
          status
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const deleteEventDetail = /* GraphQL */ `
  mutation DeleteEventDetail(
    $input: DeleteEventDetailInput!
    $condition: ModelEventDetailConditionInput
  ) {
    deleteEventDetail(input: $input, condition: $condition) {
      id
      title
      creator
      desc
      location
      date
      createdAt
      invitees {
        items {
          id
          name
          status
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
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
      status
      event {
        id
        title
        creator
        desc
        location
        date
        createdAt
        invitees {
          nextToken
        }
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
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
      status
      event {
        id
        title
        creator
        desc
        location
        date
        createdAt
        invitees {
          nextToken
        }
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
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
      status
      event {
        id
        title
        creator
        desc
        location
        date
        createdAt
        invitees {
          nextToken
        }
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
