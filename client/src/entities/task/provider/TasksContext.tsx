// /* eslint-disable react-refresh/only-export-components */
// import { TASK_ACTION_TYPE } from '@/shared/enums/tasksActions';
// import { ArrayTasksType, ITask } from '../model/types';
// import { createContext, Dispatch, ReactNode, useReducer } from 'react';

// type TaskState = {
//     tasks: ArrayTasksType;
//     title: string
// };

// type Action =
//     | { type: TASK_ACTION_TYPE.SET_TASKS; tasks: ArrayTasksType }
//     | { type: TASK_ACTION_TYPE.ADD_TASK; task: ITask }
//     | { type: TASK_ACTION_TYPE.REMOVE_TASK; id: number }
//     | { type: TASK_ACTION_TYPE.UPDATE_TASK; task: ITask };

// const initialState: TaskState = {
//     tasks: [],
//     title: ''
// };

// const taskReducer = (state: TaskState, action: Action): TaskState => {
//     switch (action.type) {
//         case TASK_ACTION_TYPE.SET_TASKS:
//             return { ...state, tasks: action.tasks };

//         case TASK_ACTION_TYPE.ADD_TASK:
//             return { ...state, tasks: [...state.tasks, action.task] };

//         case TASK_ACTION_TYPE.REMOVE_TASK:
//             return {
//                 ...state,
//                 tasks: [...state.tasks.filter((el) => el.id !== action.id)],
//             };

//         case TASK_ACTION_TYPE.UPDATE_TASK:
//             return {
//                 ...state,
//                 tasks: [
//                     ...state.tasks.map((el) =>
//                         el.id === action.task.id ? action.task : el
//                     ),
//                 ],
//             };

//         default:
//             throw new Error(`Unhandled action type`);
//     }
// };

// export type TaskContextType = {
//     state: ArrayTasksType;
//     dispatch: Dispatch<Action>;
// };

// export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// export const TaskProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
//     const [state, dispatch] = useReducer(taskReducer, initialState);

//     return (
//         <TaskContext.Provider value={{ state, dispatch }}>
//             {children}
//         </TaskContext.Provider>
//     );
// };

