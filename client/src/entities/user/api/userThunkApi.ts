// src/entities/user/api/userThunkApi.ts
import { AxiosError } from "axios";
import { ApiResponseReject, ApiResponseSuccess } from "@/shared/types";
import { SignInData, SignUpData, UserWithTokenType } from "../model/types";
import { axiosInstance, setAccessToken } from "@/shared/lib/axiosInstance";
import { USER_THUNKS_TYPES } from "@/shared/enums/userThunkTypes";
import { AUTH_API_ROUTES } from "@/shared/enums/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const refreshTokensThunk = createAsyncThunk<
  ApiResponseSuccess<UserWithTokenType>,
  void,
  { rejectValue: ApiResponseReject }
>(USER_THUNKS_TYPES.REFRESH_TOKENS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<
      ApiResponseSuccess<UserWithTokenType>
    >(AUTH_API_ROUTES.REFRESH_TOKENS);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const registrationThunk = createAsyncThunk<
  ApiResponseSuccess<UserWithTokenType>,
  SignUpData,
  { rejectValue: ApiResponseReject }
>(USER_THUNKS_TYPES.REGISTRATION, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<
      ApiResponseSuccess<UserWithTokenType>
    >(AUTH_API_ROUTES.REGISTRATION, userData);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const authorizationThunk = createAsyncThunk<
  ApiResponseSuccess<UserWithTokenType>,
  SignInData,
  { rejectValue: ApiResponseReject }
>(USER_THUNKS_TYPES.AUTHORIZATION, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<
      ApiResponseSuccess<UserWithTokenType>
    >(AUTH_API_ROUTES.AUTHORIZATION, userData);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});

export const logoutThunk = createAsyncThunk<
  ApiResponseSuccess<null>,
  void,
  { rejectValue: ApiResponseReject }
>(USER_THUNKS_TYPES.LOGOUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<ApiResponseSuccess<null>>(
      AUTH_API_ROUTES.LOGOUT
    );
    setAccessToken("");
    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponseReject>;
    return rejectWithValue(err.response!.data);
  }
});
