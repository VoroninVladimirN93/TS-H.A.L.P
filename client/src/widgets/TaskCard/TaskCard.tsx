import { useState } from "react";
import TaskApi from "../../entities/task/api/TaskApi";
import { ArrayTasksType, Task, TaskStatus } from "../../entities/task/model";
import { UserType } from "../../entities/user/model";
import { ApiResponseSuccess } from "../../shared/types";
import Button from "../../shared/ui/Button/ButtonNoDiv";
import { message as antMessage } from "antd";
import styles from './TaskCard.module.css';
import TaskUpdateForm from "../TaskUpdateForm/TaskUpdateForm";

type Props = {
  user: UserType | null;
  task: Task;
  tasks: ArrayTasksType;
  setTasks: React.Dispatch<React.SetStateAction<ArrayTasksType | []>>; 
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function TaskCard({
  task,
  tasks,
  setTasks,
  user,
  setLoading,
}: Props) {
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);

  const deleteHandler = async (id: number) => {
    setLoading(true);
    try {
      const response = await TaskApi.deleteTaskById(id);
      const { statusCode, error, message } =
        response as ApiResponseSuccess<Task>;
      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        antMessage.success(message);
        setTasks(tasks.filter((filteredArray) => filteredArray.id !== id));
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

  const statusClassName = (task: Task) => {
    const classNames: Record<TaskStatus, string> = {
      done: styles.done,
      undone: styles.undone,
      canceled: styles.canceled,
      paused: styles.paused,
    };

    return classNames[task.status];
  };

  return (
    <div className={`${styles.cardContainer} ${statusClassName(task)}`}>
      <div className={styles.cardTitle}>{task.title}</div>
      <div className={styles.cardDescription}>{task.description}</div>
      <div className={styles.cardStatus}>{task.status}</div>
      {user?.id === task.user_id && (
        <div className={styles.cardButtons}>
          <Button
            type="button"
            text={showUpdateForm ? "Скрыть" : "Изменить"}
            color="orange"
            onClick={() => setShowUpdateForm((prev) => !prev)}
          />
          <Button
            onClick={() => deleteHandler(task.id)}
            type="button"
            text="Удалить"
            color="red"
          />
        </div>
      )}
      {showUpdateForm && user?.id === task.user_id && (
        <TaskUpdateForm
          user={user}
          task={task}
          setTasks={setTasks}
          setLoading={setLoading}
          setShowUpdateForm={setShowUpdateForm}
        />
      )}
    </div>
  );
}

export default TaskCard;
