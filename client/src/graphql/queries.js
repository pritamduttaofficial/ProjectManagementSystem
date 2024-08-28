import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
      createdAt
    }
  }
`;

export const GET_CLIENTS_PROJECT_FORM = gql`
  query GetClients {
    clients {
      id
      name
    }
  }
`;

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      name
      description
      createdAt
      client {
        id
        name
      }
      endDate
      id
      startDate
      status
      tasks {
        id
        title
      }
      updatedAt
    }
  }
`;
