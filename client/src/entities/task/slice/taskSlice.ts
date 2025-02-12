import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  getAllThunk,
  createThunk,
  deleteByIdThunk,
  updateByIdThunk,
  getByIdThunk,
} from "../api/taskThunkApi";
import { ArrayTasksType, Task } from "../model/types";
// для одной таски добавить тип
type TaskState = {
  tasks: ArrayTasksType | [];
  task?: Task
  error: string | null;
  loading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  // task:  [],
  error: null,
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllTasksThunk
      .addCase(getAllThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(getAllThunk.rejected, (state, action) => {
        state.loading = false;
        state.tasks = [];
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      })

      // getByIdThunk
      .addCase(getByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(getByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.tasks = [];
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      })

      // createTaskThunk
      .addCase(createThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, action.payload.data];
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(createThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      })

      // deleteTaskThunk
      .addCase(deleteByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.data.id
        );
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(deleteByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      })

      // updateTaskThunk
      .addCase(updateByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.data.id ? action.payload.data : task
        );
        state.error = null;
        message.success(action.payload.message);
      })
      .addCase(updateByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.error;
        message.error(action.payload!.error);
      });
  },
});

export const taskReducer = taskSlice.reducer;
