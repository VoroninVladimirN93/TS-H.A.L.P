import Button from "@/shared/ui/Button/ButtonNoDiv"
import React, { useState } from "react"
import styles from "./TaskForm.module.css"
import { RawTaskData } from "@/entities/task"
import { useAppDispatch } from "@/shared/hooks/reduxHooks"
import { createThunk } from "@/entities/task/api/taskThunkApi"
import { unwrapResult } from "@reduxjs/toolkit"

const inputsInitialState: RawTaskData = {
    title: "",
    description: "",
    status: "undone",
}

export function TaskForm(): React.JSX.Element {
    const [inputs, setInputs] = useState<RawTaskData>(inputsInitialState)

    const dispatch = useAppDispatch()

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const resultAction = await dispatch(createThunk({ ...inputs }))
            unwrapResult(resultAction)
            setInputs(inputsInitialState)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("An unexpected error")
            }
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className={styles.listContainer}>
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
                type="submit"
            />
        </form>
    )
}
