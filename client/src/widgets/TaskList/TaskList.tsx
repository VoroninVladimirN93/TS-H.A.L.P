import { useEffect, useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { ArrayTasksType, RawTaskData, Task } from "../../entities/task/model";
import TaskApi from "../../entities/task/api/TaskApi";
import { UserType } from "../../entities/user/model";
import { ApiResponseSuccess } from "../../shared/types";
import { message as antMessage } from "antd";
import Button from "../../shared/ui/Button/ButtonNoDiv";
import styles from './TaskList.module.css';

const inputsInitialState: RawTaskData = {
  title: "",
  description: "",
  status: "undone",
};

type Props = {
  user: UserType | null;
};

function TaskList({ user }: Props) {
  const [tasks, setTasks] = useState<ArrayTasksType | []>([]);
  const [inputs, setInputs] = useState<RawTaskData>(inputsInitialState);
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async () => {
    const { title, description, status } = inputs;
    setLoading(true);
    if (!title || title.trim() === "") {
      return antMessage.error("Не заполнено поле названия задачи");
    }
    if (!description || description.trim() === "") {
      return antMessage.error("Не заполнено поле описания задачи");
    }
    if (!status) {
      return antMessage.error("Не передан статус задачи");
    }

    try {
      const response = await TaskApi.createTask({
        title,
        description,
        status,
      });

      const { data, statusCode, error, message } =
        response as ApiResponseSuccess<Task>;
      if (error) {
        antMessage.error(error);
        return;
      }
      if (statusCode === 201) {
        antMessage.success(message);
        setTasks((prevState) => [...prevState, data]);
        setInputs(inputsInitialState);
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
  };

  useEffect(() => {
    if(user){
    const fetchingHandler = async () => {
      setLoading(true);
      try {
        const response = await TaskApi.getAllTasks();
        const { data, statusCode, error, message} =
          response as ApiResponseSuccess<ArrayTasksType>;

        if (error) {
          antMessage.error(error);
          return;
        }
        if (statusCode === 204) {
          antMessage.success(message);
        }
        if (statusCode === 200) {
          setTasks(data);
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
    };
    fetchingHandler();}
  }, [user]);

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
      {loading && <div className={styles.loading}>Loading...</div>}
      <div className={styles.taskContainer}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            loading={loading}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
