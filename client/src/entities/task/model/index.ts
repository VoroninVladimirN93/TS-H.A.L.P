export type RawTaskData = {
  title: string;
  description: string;
  status?: "done" | "undone" | "paused" | "canceled";
};

export type Task = RawTaskData & {
  id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ArrayTasksType = Task[];
