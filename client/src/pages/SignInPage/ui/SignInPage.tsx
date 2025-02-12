import React from "react";
import { useEffect } from "react";
// import { UserType } from "@/entities/user/model/index";
import { AuthForm } from "@/features";

// type Props = {
//   setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
// };

export function SignInPage(): React.JSX.Element {

  useEffect(() => {
    document.title = 'Authorization Page'
}, [])

  return (
    <>
      <AuthForm type={"signin"} />
    </>
  );
}
