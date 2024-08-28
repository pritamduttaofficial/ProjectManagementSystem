export const typeDefs = `#graphql

    type Project {
        id: ID!
        name: String!
        description: String
        status: ProjectStatus!
        startDate: String
        endDate: String
        budget: Float
        client: Client!           
        tasks: [Task!]!           
        createdAt: String!
        updatedAt: String!
    }

    type Client {
        id: ID!
        name: String!
        email: String!
        phone: String
        projects: [Project!]!
        createdAt: String!
        updatedAt: String!
    }

    type Task {
        id: ID!
        title: String!
        description: String
        dueDate: String
        project: Project!          
        createdAt: String!
        updatedAt: String!
    }


    # Enum for project statuses
    enum ProjectStatus {
        NOT_STARTED
        IN_PROGRESS
        COMPLETED
        ON_HOLD
    }

    # Queries to fetch projects and clients
    type Query {
        projects: [Project!]!
        project(id: ID!): Project

        clients: [Client!]!
        client(id: ID!): Client

        tasks: [Task!]!
        task(id: ID!): Task

        # assignees : [Assignee!]!
        # assignee(id : ID!) : Assignee
    }

    # Mutations for creating and updating projects and clients
    type Mutation {
        # Create a new project
        createProject(
            name: String!
            description: String
            status: ProjectStatus!
            startDate: String
            endDate: String
            budget: Float
            client: ID!
        ): Project!

        # Update an existing project
        updateProject(
            id: ID!
            name: String
            description: String
            status: ProjectStatus
            startDate: String
            endDate: String
            budget: Float
        ): Project!

        # Delete a project
        deleteProject(id: ID!): Boolean!

        # Create a new client
        createClient(
            name: String!
            email: String!
            phone: String
        ): Client!

        # Update an existing client
        updateClient(
            id: ID!
            name: String
            email: String
            phone: String
        ): Client!

        # Delete a client
        deleteClient(id: ID!): Boolean!

        # Create a Task
        createTask(
            title: String!,
            description: String, 
            dueDate: String, 
            project: ID!
        ): Task!

        # Update a Task
        updateTask(
            id: ID!, 
            title: String, 
            description: String,  
            dueDate: String
        ): Task!

        # Delete a Task
        deleteTask(id: ID!): Boolean!
    }
`;
