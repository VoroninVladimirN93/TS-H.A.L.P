import styles from "./TaskList.module.css";
import { useEffect, useState } from "react";
import { useUser } from "@/shared/hooks/useUser";
import { ArrayTasksType, TaskApi, TaskItem } from "@/entities/task";
import { ApiResponseSuccess } from "@/shared/types";
import { useTask } from "@/shared/hooks/useTask";
import { TASK_ACTION_TYPE } from "@/shared/enums/tasksActions";

export function TaskList() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const { state, dispatch } = useTask();
  const { tasks } = state;

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

  useEffect(() => {
    if (user) {
      TaskApi.getAllTasks().then((response) => {
        const { data: tasks } = response as ApiResponseSuccess<ArrayTasksType>;
        dispatch({ type: TASK_ACTION_TYPE.SET_TASKS, tasks });
      });
    }
  }, [dispatch, user]);

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
