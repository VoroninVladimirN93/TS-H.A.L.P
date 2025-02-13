import { useState } from "react"
import styles from "./TaskItem.module.css"
import { ArrayTasksType, Task, TaskStatus } from "@/entities/task/model/types"
import { UserType } from "@/entities/user"
import Button from "@/shared/ui/Button/ButtonNoDiv"
import { TaskUpdateForm } from "@/widgets/TaskUpdateForm"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks"
import { unwrapResult } from "@reduxjs/toolkit"
import { deleteByIdThunk } from "../api/taskThunkApi"

type Props = {
    user?: UserType | null
    task: Task
    tasks?: ArrayTasksType
    setTasks?: React.Dispatch<React.SetStateAction<ArrayTasksType | []>>
    loading?: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function TaskItem({ task, setLoading }: Props): React.JSX.Element {
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false)
    const user = useAppSelector((state) => state.user.user)
    const dispatch = useAppDispatch()
    const deleteHandler = async (id: number) => {
        // setLoading(true);
        // try {
        //   const response = await TaskApi.deleteTaskById(id);
        //   const { statusCode, error, message } =
        //     response as ApiResponseSuccess<Task>;
        //   if (error) {
        //     antMessage.error(error);
        //     return;
        //   }
        //   if (statusCode === 200) {
        //     antMessage.success(message);
        //     setTasks(tasks.filter((filteredArray) => filteredArray.id !== id));
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
        // TaskApi.deleteTaskById(id).then((response) => {
        //   const { data } = response as ApiResponseSuccess<Task>;
        //   dispatch({ type: TASK_ACTION_TYPE.REMOVE_TASK, id: data.id });
        // });
        {
            try {
                const resultAction = await dispatch(deleteByIdThunk(id))
                unwrapResult(resultAction)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                } else {
                    console.log("An unexpected error")
                }
            }
        }
    }

    const statusClassName = (task: Task) => {
        const classNames: Record<TaskStatus, string> = {
            done: styles.done,
            undone: styles.undone,
            canceled: styles.canceled,
            paused: styles.paused,
        }

        return classNames[task.status]
    }

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
                    setLoading={setLoading}
                    setShowUpdateForm={setShowUpdateForm}
                />
            )}
        </div>
    )
}
