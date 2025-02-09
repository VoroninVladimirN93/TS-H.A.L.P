import { UserType } from "../../entities/user/model";
import TaskList from "../../widgets/TaskList/TaskList";

type Props = {
  user: UserType | null;
}

function TaskPage({user}:Props) {
  return (
    <>
      <div>Страничка c задачами</div>
      <TaskList user={user}/>
    </>
  );
}

export default TaskPage;
