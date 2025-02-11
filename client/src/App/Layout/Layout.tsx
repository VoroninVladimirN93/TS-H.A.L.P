
import { UserApi } from "@/entities/user";
import { UserWithTokenType } from "@/entities/user/model/types";
import { UserContext } from "@/entities/user/provider/UserContext";
import { setAccessToken } from "@/shared/lib/axiosInstance";
import { ApiResponseSuccess } from "@/shared/types";
import { Footer, Navbar } from "@/widgets";
import React, {useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

export function Layout(): React.JSX.Element {

// const {user, setUser} = useUser()

const context = useContext(UserContext);

if (context === undefined) {
  throw new Error("MyComponent must be used within a UserProvider");
}

const { setUser } = context;

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

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
