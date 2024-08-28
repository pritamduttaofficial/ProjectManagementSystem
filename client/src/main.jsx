import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage.jsx";
import ClientForm from "./components/clients/ClientForm.jsx";
import ProjectForm from "./components/projects/ProjectForm.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
