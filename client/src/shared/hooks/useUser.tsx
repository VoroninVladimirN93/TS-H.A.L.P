import { UserContext, UserContextType, } from "@/entities/user/provider/UserContext";
import { useContext } from "react";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("No context - UserContext");
  }
  return context;
};
