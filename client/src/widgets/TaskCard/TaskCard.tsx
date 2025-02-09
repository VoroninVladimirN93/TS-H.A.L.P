import { useState } from "react";
import TaskApi from "../../entities/task/api/TaskApi";
import { ArrayTasksType, Task } from "../../entities/task/model";
import { UserType } from "../../entities/user/model";
import { ApiResponseSuccess } from "../../shared/types";
import Button from "../../shared/ui/Button/ButtonNoDiv";
import { message as antMessage } from "antd";
type Props = {
  user: UserType | null;
  tasks: ArrayTasksType;
  setTasks: React.Dispatch<React.SetStateAction<ArrayTasksType | []>>;
  task: Task;
};

function TaskCard({ task, tasks, setTasks, user }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  
  const deleteHandler = async (id:number) => {
    const response = await TaskApi.deleteTaskById(id);
    setLoading(true);
    try {
      const {statusCode, error, message } =
        response as ApiResponseSuccess<Task>;
      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 200) {
        antMessage.success(message);
        setTasks(tasks.filter((filteredArray)=>filteredArray.id !== id));
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

  return (
    <>
      {!loading && <div>Карточки говорят (однажды мы будем здесь)</div>}
      <div>{task.id}</div>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>{task.status}</div>
      {user?.id === task.user_id && (
        <>
          <Button
            onClick={() => console.log("Change")}
            type={"button"}
            text={"Изменить"}
            color="yellow"
          />
          <Button
            onClick={() => {
              console.log("Delete");
              deleteHandler(task.id);
            }}
            type={"button"}
            text={"Удалить"}
            color="red"
          />
        </>
      )}
    </>
  );
}

export default TaskCard;
