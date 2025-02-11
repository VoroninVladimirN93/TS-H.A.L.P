import styles from "./TaskList.module.css";
import { message as antMessage } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "@/shared/hooks/useUser";
import { TaskCard } from "@/widgets/TaskCard";
import { ArrayTasksType, RawTaskData, Task, TaskApi } from "@/entities/task";
import { ApiResponseSuccess } from "@/shared/types";
import Button from "@/shared/ui/Button/ButtonNoDiv";
import { useTask } from "@/shared/hooks/useTask";
import { TASK_ACTION_TYPE } from "@/shared/enums/tasksActions";



// type Props = {
//   user: UserType | null;
// };

export function TaskList() {
  

  const [loading, setLoading] = useState<boolean>(false);

  const {user} = useUser()


  const onSubmitHandler = async () => {
    const { title, description, status } = inputs;
    setLoading(true);
    if (!title || title.trim() === "") {
      return antMessage.error("Не заполнено поле названия задачи");
    }
    if (!description || description.trim() === "") {
      return antMessage.error("Не заполнено поле описания задачи");
    }
    if (!status) {
      return antMessage.error("Не передан статус задачи");
    }

    try {
      const response = await TaskApi.createTask({
        title,
        description,
        status,
      });

      const { data, statusCode, error, message } =
        response as ApiResponseSuccess<Task>;
      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 201) {
        antMessage.success(message);
        setTasks((prevState) => [...prevState, data]);
        setInputs(inputsInitialState);
      }
    } catch (error) {
      if (error instanceof Error) {
        antMessage.error(error.message);
      } else {
        antMessage.error("Unknown server error");
      }
    } finally {
      setLoading(false);
    }
  };

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

  const {state,dispatch} = useTask()
const {tasks} = state
  useEffect(() => {
    if(user)
{    TaskApi.getAllTasks()
        .then((response) => {
            const { data: tasks } = response as ApiResponseSuccess<ArrayTasksType>;
            dispatch({ type: TASK_ACTION_TYPE.SET_TASKS, tasks })
        })}
}, [dispatch,user])

  return (
    <div className={styles.listContainer}>
      {loading && <div className={styles.loading}>Loading...</div>}
      <div className={styles.taskContainer}>
        {tasks && tasks.map((task) => (
          <TaskCard
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
