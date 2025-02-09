import { AxiosError, AxiosRequestConfig } from "axios";
import { defaultRejectedAxiosError } from "../../../shared/consts";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import { ApiResponseReject, ApiResponseSuccess } from "../../../shared/types";
import { ArrayTasksType, RawTaskData, Task } from "../model";

export default class TaskApi {
  static async getAllTasks(): Promise<
    ApiResponseSuccess<ArrayTasksType> | ApiResponseReject
  > {
    try {
      const response = await axiosInstance.get<
        ApiResponseSuccess<ArrayTasksType>
      >(`/tasks/`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as ApiResponseReject;
      }
      return axiosError.response.data;
    }
  }

  static async getTaskById(
    id: number
  ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
    try {
      const response = await axiosInstance.get<ApiResponseSuccess<Task>>(
        `/tasks/${id}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as ApiResponseReject;
      }
      return axiosError.response.data;
    }
  }

  static async createTask(
    data: RawTaskData
  ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
    try {
      const response = await axiosInstance.post<ApiResponseSuccess<Task>>(
        `/tasks/`,
        data
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as ApiResponseReject;
      }
      return axiosError.response.data;
    }
  }

  static async deleteTaskById(
    id: number
  ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
    try {
      const response = await axiosInstance.delete<ApiResponseSuccess<Task>>(
        `/tasks/${id}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as ApiResponseReject;
      }
      return axiosError.response.data;
    }
  }

  static async updateTaskById(
    id: number,
    updatedTask: AxiosRequestConfig<RawTaskData> | undefined
  ): Promise<ApiResponseSuccess<Task> | ApiResponseReject> {
    try {
      const response = await axiosInstance.put<ApiResponseSuccess<Task>>(
        `/tasks/${id}`,
        updatedTask
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as ApiResponseReject;
      }
      return axiosError.response.data;
    }
  }
}
