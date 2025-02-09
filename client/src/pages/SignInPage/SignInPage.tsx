import React from "react";
import AuthForm from "../../features/auth/ui/AuthForm/AuthForm/AuthForm";
import { JSX } from "react/jsx-runtime";
import { UserType } from "../../entities/user/model";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

function SignInPage({ setUser }: Props): JSX.Element {
  return (
    <>
      <AuthForm type={"signin"} setUser={setUser} />
    </>
  );
}

export default SignInPage;
