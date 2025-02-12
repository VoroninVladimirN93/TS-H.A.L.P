import React, { useState } from "react";
import styles from "./TaskUpdateForm.module.css";
import { ArrayTasksType, RawTaskData, Task, TaskApi } from "@/entities/task";
import { UserType } from "@/entities/user";
import { ApiResponseSuccess } from "@/shared/types";
import Button from "@/shared/ui/Button/ButtonNoDiv";
import { TASK_ACTION_TYPE } from "@/shared/enums/tasksActions";
import { useTask } from "@/shared/hooks/useTask";

type Props = {
  user: UserType;
  task: Task;
  setTasks?: React.Dispatch<React.SetStateAction<ArrayTasksType | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TaskUpdateForm({
  user,
  task,
  setLoading,
  setShowUpdateForm,
}: Props) {
  const [inputs, setInputs] = useState<RawTaskData>({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const isEmptyFormData =
    inputs.title.trim().length === 0 || inputs.description.trim().length === 0;

  function changeInputsHandler(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }
const {dispatch} = useTask()

  async function sendUpdatedTask() {
    // if (user.id !== task.user_id) {
    //   antMessage.error(`No rights to update task with id ${task.id}`);
    //   return;
    // }
    // if (isEmptyFormData) {
    //   antMessage.error("Все поля обязательны к заполнению");
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const response = await TaskApi.updateTaskById(task.id, {
    //     data: inputs,
    //   });
    //   const { data, statusCode, error, message } =
    //     response as ApiResponseSuccess<Task>;
    //   if (error) {
    //     antMessage.error(error);
    //     return;
    //   }
    //   antMessage.success(message);
    //   if (statusCode === 200) {
    //     setTasks((prev) => prev.map((el) => (el.id === data.id ? data : el)));
    //     setInputs({ title: "", description: "", status: "undone" });
    //     setShowUpdateForm(false);
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     antMessage.error(error.message);
    //   } else {
    //     antMessage.error("Unknown server error");
    //   }
    // } finally {
    //   setLoading(false);
    // }


    
      TaskApi.updateTaskById(task.id, {data: inputs,})
      .then((response)=> {
        const {data:task} = response as ApiResponseSuccess<Task>
        dispatch({type: TASK_ACTION_TYPE.UPDATE_TASK, task})
      })
      setShowUpdateForm(false)
  }

  return (
    <div className={styles.formContainer}>
      <input
        className={styles.inputField}
        name="title"
        value={inputs.title}
        placeholder="Заголовок"
        onChange={changeInputsHandler}
      />
      <input
        className={styles.inputField}
        name="description"
        value={inputs.description}
        placeholder="Описание"
        onChange={changeInputsHandler}
      />
      <select
        className={styles.selectField}
        name="status"
        value={inputs.status}
        onChange={changeInputsHandler}
      >
        <option value="done">Done</option>
        <option value="undone">Undone</option>
        <option value="paused">Paused</option>
        <option value="canceled">Canceled</option>
      </select>
      <Button
        className={styles.saveButton}
        type="button"
        color="orange"
        text="Сохранить"
        onClick={sendUpdatedTask}
      />
    </div>
  );
}
