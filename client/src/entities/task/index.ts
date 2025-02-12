export { taskReducer } from "./slice/taskSlice";

export { TaskItem } from "./ui/TaskItem";


export { TaskContext } from "./provider/TaskContext";
export {TaskApi} from "./api/TaskApi";
export type {
  RawTaskData,
  TaskStatus,
  Task,
  ArrayTasksType,
} from "./model/types";