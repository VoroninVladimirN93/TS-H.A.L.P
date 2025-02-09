import { useEffect, useState } from "react";
import "./App.css";
import { UserType, UserWithTokenType } from "../entities/user/model";
import UserApi from "../entities/user/api/UserApi";
import { ApiResponseSuccess } from "../shared/types";
import { setAccessToken } from "../shared/lib/axiosInstance";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TaskPage from "../pages/TaskPage/TaskPage";
import Navbar from "../widgets/Navbar/Navbar";
import MainPage from "../pages/MainPage/MainPage/MainPage";

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    UserApi.refreshTokens()
      .then((response) => {
        const { data, error, statusCode } =
          response as ApiResponseSuccess<UserWithTokenType>;
        if (error) {
          setUser(null);
        }
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      })
      .catch(({ message }) => console.log(message));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar setUser={setUser} user={user} />
          <p>{user && `Привет, ${user.username}`}</p>

          <Outlet />
        </>
      ),
      children: [
        {
          path: "/signin",
          element: <SignInPage setUser={setUser} />,
        },
        {
          path: "/signup",
          element: <SignUpPage setUser={setUser} />,
        },
        {
          path: "/tasks",
          element: <TaskPage user={user} />,
        },        {
          path: "/",
          element:  <MainPage user={user} />
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
