import { createBrowserRouter } from "react-router-dom";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { SignUpPage, SignInPage, TasksPage, MainPage, ErrorPage } from "@/pages";
import { Layout } from "../Layout/Layout";

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: CLIENT_ROUTES.HOME,
        element: <MainPage  />,
      },
      {
        path: CLIENT_ROUTES.AUTHORIZATION,
        element: <SignInPage  />,
      },
      {
        path: CLIENT_ROUTES.REGISTRATION,
        element: <SignUpPage />,
      },
      {
        path: CLIENT_ROUTES.TASKS,
        element: <TasksPage  />,
      },
      {
        path: CLIENT_ROUTES.NOTFOUND,
        element: <ErrorPage />,
      },
    ],
  },
]);
