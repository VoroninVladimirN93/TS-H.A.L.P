// export interface ISignInData {
//   email: string;
//   password: string;
// }

// export interface ISignUpData extends ISignInData {
//   confirmPassword?: string;
//   username: string;
// }

// export interface IUserType {
//   id: number;
//   username: string;
//   password: string;
//   email: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IUserWithTokenType extends IUserType {
//   accessToken: string;
// }

// Данные для входа
export type SignInData = {
  email: string;
  password: string;

};
// Данные для регистрации
export type SignUpData = SignInData & {
  confirmPassword?: string;
  username: string;
};

// Пользователь, пришедший из БД
export type UserType = {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

// User с токеном
export type UserWithTokenType = {
  user: UserType
  accessToken: string;
};
