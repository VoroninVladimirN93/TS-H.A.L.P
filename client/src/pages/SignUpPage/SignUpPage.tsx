import { JSX } from "react";
import { UserType } from "../../entities/user/model";
import AuthForm from "../../features/auth/ui/AuthForm/AuthForm/AuthForm";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

function SignUpPage({ setUser }: Props): JSX.Element {
  return (
    <>
      <AuthForm type={"signup"} setUser={setUser} />
    </>
  );
}

export default SignUpPage;
