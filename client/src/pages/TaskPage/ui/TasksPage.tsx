// import { UserType } from "../../../entities/user/model";
import { TaskForm, TaskList } from "@/widgets"
import styles from "./TasksPage.module.css"
import { useEffect } from "react"

// type Props = {
//   user: UserType | null;
// };

export function TasksPage() {
    useEffect(() => {
        document.title = "Tasks Page"
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.title}>Страничка c задачами</div>
            <TaskForm />
            <TaskList />
        </div>
    )
}
