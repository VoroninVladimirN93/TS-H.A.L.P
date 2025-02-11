import { TaskContext } from "@/entities/task";
import { TaskContextType } from "@/entities/task/provider/TaskContext";
import { useContext } from "react";

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("No Context - Task context");
  }

  return context;
};
