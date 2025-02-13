import { TASK_THUNKS_TYPES } from "@/shared/enums/taskThunkTypes"
import { axiosInstance } from "@/shared/lib/axiosInstance"
import { ApiResponseReject, ApiResponseSuccess } from "@/shared/types"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ArrayTasksType, RawTaskData, Task } from "../model/types"
import { TASKS_API_ROUTES } from "@/shared/enums/apiRoutes"
import { AxiosError } from "axios"

export const getAllThunk = createAsyncThunk<
    ApiResponseSuccess<ArrayTasksType>,
    void,
    { rejectValue: ApiResponseReject }
>(TASK_THUNKS_TYPES.READ, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get<
            ApiResponseSuccess<ArrayTasksType>
        >(TASKS_API_ROUTES.ALL_TASKS)
        return data
    } catch (error) {
        const err = error as AxiosError<ApiResponseReject>
        return rejectWithValue(err.response!.data)
    }
})

// export class TaskApi {
//   static async getAllTasks(): Promise<
//     ApiResponseSuccess<ArrayTasksType> | ApiResponseReject
//   > {
//     try {
//       const response = await axiosInstance.get<
//         ApiResponseSuccess<ArrayTasksType>
//       >(`/tasks`);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponseReject>;
//       if (!axiosError.response) {
//         return defaultRejectedAxiosError as ApiResponseReject;
//       }
//       return axiosError.response.data;
//     }
//   }

export const getByIdThunk = createAsyncThunk<
    ApiResponseSuccess<ArrayTasksType>,
    void,
    { rejectValue: ApiResponseReject }
>(TASK_THUNKS_TYPES.READ_ONE, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get<
            ApiResponseSuccess<ArrayTasksType>
        >(TASKS_API_ROUTES.ALL_TASKS)
        return data
    } catch (error) {
        const err = error as AxiosError<ApiResponseReject>
        return rejectWithValue(err.response!.data)
    }
})

//   static async getTaskById(
//     id: number
//   ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
//     try {
//       const response = await axiosInstance.get<ApiResponseSuccess<Task>>(
//         `/tasks/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponseReject>;
//       if (!axiosError.response) {
//         return defaultRejectedAxiosError as ApiResponseReject;
//       }
//       return axiosError.response.data;
//     }
//   }

export const createThunk = createAsyncThunk<
    ApiResponseSuccess<Task>,
    RawTaskData,
    { rejectValue: ApiResponseReject }
>(TASK_THUNKS_TYPES.CREATE, async (newTaskData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post<ApiResponseSuccess<Task>>(
            TASKS_API_ROUTES.ALL_TASKS,
            newTaskData,
        )
        return data
    } catch (error) {
        const err = error as AxiosError<ApiResponseReject>
        return rejectWithValue(err.response!.data)
    }
})

//   static async createTask(
//     data: RawTaskData
//   ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
//     try {
//       const response = await axiosInstance.post<ApiResponseSuccess<Task>>(
//         `/tasks`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponseReject>;
//       if (!axiosError.response) {
//         return defaultRejectedAxiosError as ApiResponseReject;
//       }
//       return axiosError.response.data;
//     }
//   }

export const updateByIdThunk = createAsyncThunk<
    ApiResponseSuccess<Task>,
    { id: number; updatedTask: RawTaskData },
    { rejectValue: ApiResponseReject }
>(
    TASK_THUNKS_TYPES.UPDATE,
    async ({ id, updatedTask }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.put<ApiResponseSuccess<Task>>(
                TASKS_API_ROUTES.ALL_TASKS + `/${id}`,
                updatedTask,
            )
            return data
        } catch (error) {
            const err = error as AxiosError<ApiResponseReject>
            return rejectWithValue(err.response!.data)
        }
    },
)

//   static async updateTaskById(
//     id: number,
//     updatedTask: AxiosRequestConfig<RawTaskData> | undefined
//   ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
//     try {
//       const response = await axiosInstance.put<ApiResponseSuccess<Task>>(
//         `/tasks/${id}`,
//         updatedTask
//       );
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponseReject>;
//       if (!axiosError.response) {
//         return defaultRejectedAxiosError as ApiResponseReject;
//       }
//       return axiosError.response.data;
//     }
//   }
// }

export const deleteByIdThunk = createAsyncThunk<
    ApiResponseSuccess<Task>,
    number,
    { rejectValue: ApiResponseReject }
>(TASK_THUNKS_TYPES.DELETE, async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete<ApiResponseSuccess<Task>>(
            TASKS_API_ROUTES.ALL_TASKS + `/${id}`,
        )
        return data
    } catch (error) {
        const err = error as AxiosError<ApiResponseReject>
        return rejectWithValue(err.response!.data)
    }
})

//   static async deleteTaskById(
//     id: number
//   ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
//     try {
//       const response = await axiosInstance.delete<ApiResponseSuccess<Task>>(
//         `/tasks/${id}`
//       );
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponseReject>;
//       if (!axiosError.response) {
//         return defaultRejectedAxiosError as ApiResponseReject;
//       }
//       return axiosError.response.data;
//     }
//   }
