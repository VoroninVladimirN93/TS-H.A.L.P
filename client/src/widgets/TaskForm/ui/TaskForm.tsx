import Button from "@/shared/ui/Button/ButtonNoDiv";
import React, { useState } from "react";
import styles from './TaskForm.module.css'
import { useTask } from "@/shared/hooks/useTask";
import { RawTaskData } from "@/entities/task";

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
