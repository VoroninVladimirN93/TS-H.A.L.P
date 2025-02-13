import React, { useState } from "react"
import styles from "./TaskUpdateForm.module.css"
import { ArrayTasksType, RawTaskData, Task } from "@/entities/task"
import { UserType } from "@/entities/user"
import Button from "@/shared/ui/Button/ButtonNoDiv"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks"
import { unwrapResult } from "@reduxjs/toolkit"
import { updateByIdThunk } from "@/entities/task/api/taskThunkApi"
import { message as antMessage } from "antd"

type Props = {
    user: UserType
    task: Task
    setTasks?: React.Dispatch<React.SetStateAction<ArrayTasksType | []>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function TaskUpdateForm({
    // user,
    task,
    setLoading,
    setShowUpdateForm,
}: Props): React.JSX.Element {
    const [inputs, setInputs] = useState<RawTaskData>({
        title: task.title,
        description: task.description,
        status: task.status,
    })
    const user = useAppSelector((state) => state.user.user)
    const isEmptyFormData =
        inputs.title.trim().length === 0 ||
        inputs.description.trim().length === 0

    function changeInputsHandler(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ): void {
        setInputs((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    const dispatch = useAppDispatch()

    async function sendUpdatedTask() {
        if (user!.id !== task.user_id) {
            antMessage.error(`No rights to update task with id ${task.id}`)
            return
        }
        if (isEmptyFormData) {
            antMessage.error("Все поля обязательны к заполнению")
            return
        }
        setLoading(true)
        {
            try {
                console.log(task.id, inputs)

                const resultAction = await dispatch(
                    updateByIdThunk({ id: task.id, updatedTask: inputs }),
                )
                unwrapResult(resultAction)
                setShowUpdateForm(false)
                setLoading(false)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                } else {
                    console.log("An unexpected error")
                }
            }
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
    )
}
