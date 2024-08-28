import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation CreateClient($name: String!, $email: String!, $phone: String!) {
    createClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $status: ProjectStatus!
    $client: ID!
    $description: String
    $startDate: String
    $endDate: String
    $budget: Float
  ) {
    createProject(
      name: $name
      status: $status
      client: $client
      description: $description
      startDate: $startDate
      endDate: $endDate
      budget: $budget
    ) {
      id
      name
      status
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: ID!) {
    deleteProject(id: $deleteProjectId)
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $dueDate: String!
    $projectId: ID!
  ) {
    createTask(
      title: $title
      description: $description
      dueDate: $dueDate
      project: $projectId
    ) {
      id
      title
      description
      dueDate
      project {
        id
        name
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId)
  }
`;
