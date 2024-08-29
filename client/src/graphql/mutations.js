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

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $updateClientId: ID!
    $name: String
    $email: String
    $phone: String
  ) {
    updateClient(
      id: $updateClientId
      name: $name
      email: $email
      phone: $phone
    ) {
      id
      name
      email
      phone
      updatedAt
      projects {
        id
        name
      }
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

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $updateProjectId: ID!
    $name: String
    $description: String
    $status: ProjectStatus
    $startDate: String
    $endDate: String
    $budget: Float
  ) {
    updateProject(
      id: $updateProjectId
      name: $name
      description: $description
      status: $status
      startDate: $startDate
      endDate: $endDate
      budget: $budget
    ) {
      id
      name
      description
      status
      startDate
      endDate
      budget
      updatedAt
      client {
        id
        name
      }
      tasks {
        id
        title
      }
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

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $updateTaskId: ID!
    $title: String
    $description: String
    $dueDate: String
  ) {
    updateTask(
      id: $updateTaskId
      title: $title
      description: $description
      dueDate: $dueDate
    ) {
      id
      title
      description
      project {
        id
        name
      }
      updatedAt
    }
  }
`;
