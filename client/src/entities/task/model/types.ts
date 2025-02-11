export type RawTaskData = {
  title: string;
  description: string;
  status: TaskStatus
};

export type TaskStatus = "done" | "undone" | "canceled" | "paused";

export type Task = RawTaskData & {
  id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ArrayTasksType = Task[];

