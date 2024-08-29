import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
      createdAt
      projects {
        id
        name
      }
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
      budget
      tasks {
        id
        title
      }
      updatedAt
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      name
      description
      startDate
      endDate
      status
      client {
        id
        name
      }
      tasks {
        id
        title
      }
      budget
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query Tasks {
    tasks {
      id
      title
      description
      createdAt
      updatedAt
      dueDate
      project {
        id
        name
      }
    }
  }
`;
