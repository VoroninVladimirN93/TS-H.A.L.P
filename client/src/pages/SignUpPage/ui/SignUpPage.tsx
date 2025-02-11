import { JSX } from "react";
import { AuthForm } from "@/features";
// import { UserType } from "@/entities/user/model/index";

// type Props = {
//   setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
// };

export function SignUpPage(): JSX.Element {
  return (
    <>
      <AuthForm type={"signup"}/>
    </>
  );
}
