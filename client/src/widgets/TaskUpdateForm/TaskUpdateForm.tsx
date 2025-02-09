import React, { useState } from "react";
import { UserType } from "../../entities/user/model";
import { ArrayTasksType, RawTaskData, Task } from "../../entities/task/model";
import { message as antMessage } from "antd";
import TaskApi from "../../entities/task/api/TaskApi";
import Button from "../../shared/ui/Button/ButtonNoDiv";
import { ApiResponseSuccess } from "../../shared/types";
import styles from './TaskUpdateForm.module.css';

type Props = {
  user: UserType;
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<ArrayTasksType | []>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function TaskUpdateForm({
  user,
  task,
  setTasks,
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

  async function sendUpdatedTask() {
    if (user.id !== task.user_id) {
      antMessage.error(`No rights to update task with id ${task.id}`);
      return;
    }
    if (isEmptyFormData) {
      antMessage.error("Все поля обязательны к заполнению");
      return;
    }
    setLoading(true);
    try {
      const response = await TaskApi.updateTaskById(task.id, {
        data: inputs,
      });
      const { data, statusCode, error, message } =
        response as ApiResponseSuccess<Task>;
      if (error) {
        antMessage.error(error);
        return;
      }
      antMessage.success(message);
      if (statusCode === 200) {
        setTasks((prev) => prev.map((el) => (el.id === data.id ? data : el)));
        setInputs({ title: "", description: "", status: "undone" });
        setShowUpdateForm(false);
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

export default TaskUpdateForm;
