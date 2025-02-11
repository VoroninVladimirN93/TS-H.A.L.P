// import { UserType } from "../../../entities/user/model";
import { TaskForm, TaskList } from "@/widgets";
import styles from "./TasksPage.module.css";

// type Props = {
//   user: UserType | null;
// };

export function TasksPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Страничка c задачами</div>
      <TaskForm />
      <TaskList />
    </div>
  );
}
