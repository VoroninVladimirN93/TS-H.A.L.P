import { JSX, useEffect } from "react";
import { AuthForm } from "@/features";
// import { UserType } from "@/entities/user/model/index";

// type Props = {
//   setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
// };

export function SignUpPage(): JSX.Element {

    useEffect(() => {
      document.title = 'Registration Page'
  }, [])

  return (
    <>
      <AuthForm type={"signup"}/>
    </>
  );
}
