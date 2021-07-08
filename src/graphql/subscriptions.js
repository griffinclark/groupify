/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEventDetail = /* GraphQL */ `
  subscription OnCreateEventDetail {
    onCreateEventDetail {
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
export const onUpdateEventDetail = /* GraphQL */ `
  subscription OnUpdateEventDetail {
    onUpdateEventDetail {
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
export const onDeleteEventDetail = /* GraphQL */ `
  subscription OnDeleteEventDetail {
    onDeleteEventDetail {
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
export const onCreateInvitee = /* GraphQL */ `
  subscription OnCreateInvitee {
    onCreateInvitee {
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
export const onUpdateInvitee = /* GraphQL */ `
  subscription OnUpdateInvitee {
    onUpdateInvitee {
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
export const onDeleteInvitee = /* GraphQL */ `
  subscription OnDeleteInvitee {
    onDeleteInvitee {
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
