import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { ArrayTasksType, Task } from "../model/types";
import { TASK_ACTION_TYPE } from "@/shared/enums/tasksActions";

type TaskState = {
  tasks: ArrayTasksType;
};

type Action =
  | { type: TASK_ACTION_TYPE.SET_TASKS; tasks: ArrayTasksType }
  | { type: TASK_ACTION_TYPE.ADD_TASK; task: Task }
  | { type: TASK_ACTION_TYPE.UPDATE_TASK; task: Task }
  | { type: TASK_ACTION_TYPE.REMOVE_TASK; id: number };

const initialState: TaskState = {
  tasks: [],
};

const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case TASK_ACTION_TYPE.SET_TASKS:
      return { ...state, tasks: action.tasks };

    case TASK_ACTION_TYPE.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case TASK_ACTION_TYPE.UPDATE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((el) =>
            el.id === action.task.id ? action.task : el
          ),
        ],
      };
    case TASK_ACTION_TYPE.REMOVE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((el) => el.id !== action.id)],
      };
    default:
      throw new Error("Не верный тип действия (action)");
  }
};

export type TaskContextType = {
  state: TaskState;
  dispatch: Dispatch<Action>;
};

type Props = {
  children: ReactNode;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({ children }: Props): React.JSX.Element {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
