/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState } from "react";
import { UserType } from "../model/types";

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: Props): React.JSX.Element {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
