import { AxiosError } from "axios";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import { ApiResponseReject, ApiResponseSuccess } from "../../../shared/types";
import { SignInData, SignUpData, UserWithTokenType } from "../model";
import { defaultRejectedAxiosError } from "../../../shared/consts";

enum AUTH_API_ROUTES {
REFRESH_TOKENS = '/auth/refreshTokens',
SIGN_UP = '/auth/signUp',
SIGN_IN = '/auth/signIn',
SIGN_OUT = '/auth/signOut',
}

export default class UserApi {
  //! Метод для получения новой пары токенов
  static async refreshTokens(): Promise<ApiResponseSuccess<UserWithTokenType> | ApiResponseReject> {
    try {
      const response = await axiosInstance.get<ApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.REFRESH_TOKENS);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>
      if(!axiosError.response){return defaultRejectedAxiosError as ApiResponseReject}
      return axiosError.response.data;
    }
  }

  //! Метод для регистрации
  static async signUp(userData:SignUpData) : Promise<ApiResponseSuccess<UserWithTokenType> | ApiResponseReject> {
    try {
      const { data } = await axiosInstance.post<ApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.SIGN_UP, userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>
      if(!axiosError.response){return defaultRejectedAxiosError as ApiResponseReject}
      return axiosError.response.data;
    }
  }

  //! Метод для аутентификации
  static async signIn(userData:SignInData) : Promise<ApiResponseSuccess<UserWithTokenType> | ApiResponseReject> {
    try {
      const { data } = await axiosInstance.post<ApiResponseSuccess<UserWithTokenType>>(AUTH_API_ROUTES.SIGN_IN, userData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>
      if(!axiosError.response){return defaultRejectedAxiosError as ApiResponseReject}
      return axiosError.response.data;
    }
  }

  //! Метод для выхода
  static async signOut() : Promise<ApiResponseSuccess<null> | ApiResponseReject> {
    try {
      const { data } = await axiosInstance.get<ApiResponseSuccess<null>>(AUTH_API_ROUTES.SIGN_OUT);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseReject>
      if(!axiosError.response){return defaultRejectedAxiosError as ApiResponseReject}
      return axiosError.response.data;
    }
  }
}
