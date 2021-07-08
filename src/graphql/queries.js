/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEventDetail = /* GraphQL */ `
  query GetEventDetail($id: ID!) {
    getEventDetail(id: $id) {
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
export const listEventDetails = /* GraphQL */ `
  query ListEventDetails(
    $filter: ModelEventDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInvitee = /* GraphQL */ `
  query GetInvitee($id: ID!) {
    getInvitee(id: $id) {
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
        status
        event {
          id
          title
          creator
          desc
          location
          date
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
