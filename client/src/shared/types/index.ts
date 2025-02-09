export type ApiResponseSuccess<T> = {
  statusCode: number;
  message: string;
  data: T;
  error: null;
};


export type ApiResponseReject = {
    statusCode: number;
    message: string;
    data: null;
    error: string;
  };