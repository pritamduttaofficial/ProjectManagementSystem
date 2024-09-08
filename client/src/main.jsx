import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage.jsx";
import ClientForm from "./components/clients/ClientForm.jsx";
import ProjectForm from "./components/projects/ProjectForm.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetails from "./components/projects/ProjectDetails.jsx";
import TaskForm from "./components/tasks/TaskForm.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";

const client = new ApolloClient({
  uri: "https://projectmanagementsystem.onrender.com",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/clients",
        element: <ClientsPage />,
      },
      {
        path: "/client-form",
        element: <ClientForm />,
      },
      {
        path: "/project-form",
        element: <ProjectForm />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/project/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/task-form",
        element: <TaskForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
