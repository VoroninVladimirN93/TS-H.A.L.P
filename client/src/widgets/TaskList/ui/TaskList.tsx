import styles from "./TaskList.module.css";
import { useEffect, useState } from "react";
import { TaskItem } from "@/entities/task";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { getAllThunk } from "@/entities/task/api/taskThunkApi";
import { unwrapResult } from "@reduxjs/toolkit";

export function TaskList() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const user = useAppSelector((state) => state.user.user);

  // useEffect(() => {
  //   if (user) {
  //     const fetchingHandler = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await TaskApi.getAllTasks();
  //         const { data, statusCode, error, message } =
  //           response as ApiResponseSuccess<ArrayTasksType>;
  //         if (error) {
  //           antMessage.error(error);
  //           return;
  //         }
  //         if (statusCode === 204) {
  //           antMessage.success(message);
  //         }
  //         if (statusCode === 200) {
  //           setTasks(data);
  //         }
  //       } catch (error) {
  //         if (error instanceof Error) {
  //           antMessage.error(error.message);
  //         } else {
  //           antMessage.error("Unknown server error");
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchingHandler();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     TaskApi.getAllTasks().then((response) => {
  //       const { data: tasks } = response as ApiResponseSuccess<ArrayTasksType>;
  //       dispatch({ type: TASK_ACTION_TYPE.SET_TASKS, tasks });
  //     });
  //   }
  // }, [dispatch, user]);

  useEffect(()=>{
const fetchingTasks = async () => {
  if(user){
    try{
    const resultAction = await   dispatch(getAllThunk())
    unwrapResult(resultAction)
  } catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    } else {
        console.log('An unexpected error');
    }
  }}
}
fetchingTasks()
  },[user,dispatch])

  return (
    <div className={styles.listContainer}>
      {loading && <div className={styles.loading}>Loading...</div>}
      <div className={styles.taskContainer}>
        {tasks &&
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              loading={loading}
              setLoading={setLoading}
            />
          ))}
      </div>
    </div>
  );
}
