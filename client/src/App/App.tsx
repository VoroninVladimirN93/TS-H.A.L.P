import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { UserProvider } from "@/entities/user";
import { TaskProvider } from "@/entities/task/provider/TaskContext";

export function App(): React.JSX.Element {
  return (
    <TaskProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </TaskProvider>
  );
}
