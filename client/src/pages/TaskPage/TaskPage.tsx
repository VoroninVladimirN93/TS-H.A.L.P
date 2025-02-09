import { UserType } from "../../entities/user/model";
import TaskList from "../../widgets/TaskList/TaskList";
import styles from './TaskPage.module.css';

type Props = {
  user: UserType | null;
};

function TaskPage({ user }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Страничка c задачами</div>
      <TaskList user={user} />
    </div>
  );
}

export default TaskPage;
