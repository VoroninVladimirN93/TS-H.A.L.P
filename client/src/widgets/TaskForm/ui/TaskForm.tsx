import Button from "@/shared/ui/Button/ButtonNoDiv";
import React, { useState } from "react";
import styles from './TaskForm.module.css'
import { useTask } from "@/shared/hooks/useTask";
import { RawTaskData, Task, TaskApi } from "@/entities/task";
import { ApiResponseSuccess } from "@/shared/types";
import { TASK_ACTION_TYPE } from "@/shared/enums/tasksActions";

const inputsInitialState: RawTaskData = {
  title: "",
  description: "",
  status: "undone",
};

export function TaskForm(): React.JSX.Element {
    const [inputs, setInputs] = useState<RawTaskData>(inputsInitialState);
const {dispatch} = useTask()

const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  setInputs((prevState)=> ({...prevState, [event.target.name]:event.target.value}))
}

const onSubmitHandler = async () => {
  TaskApi.createTask(inputs)
  .then((response)=> {
    const {data:task} = response as ApiResponseSuccess<Task>
    dispatch({type: TASK_ACTION_TYPE.ADD_TASK, task})
  })
};

  return (
    <div className={styles.listContainer}>
      <input
        className={styles.inputField}
        onChange={changeHandler}
        type="text"
        placeholder="Введите название задачи"
        name="title"
        value={inputs.title}
        autoFocus
        required
      />
      <input
        className={styles.inputField}
        onChange={changeHandler}
        type="text"
        placeholder="Введите описание задачи"
        name="description"
        value={inputs.description}
        required
      />
      <Button
        className={styles.button}
        text="Создать"
        color="red"
        type="button"
        onClick={onSubmitHandler}
      />
    </div>
  );
}
