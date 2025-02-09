import React, { SyntheticEvent, useState } from "react";
import { UserType, UserWithTokenType } from "../../../../../entities/user/model";
import { useNavigate } from "react-router-dom";
import UserValidator from "../../../../../entities/user/model/User.validator";
import { message as antMessage } from "antd";
import UserApi from "../../../../../entities/user/api/UserApi";
import { setAccessToken } from "../../../../../shared/lib/axiosInstance";
import { ApiResponseSuccess } from "../../../../../shared/types";
import Button from "../../../../../shared/ui/Button/ButtonNoDiv";
import { JSX } from "react/jsx-runtime";

type Props = {
  type: "signin" | "signup";
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

type InputsType = {
  email: string;
  password: string;
  username: string;
};

const inputsInitialState = { email: "", password: "", username: "" };

export default function AuthForm({ type, setUser }: Props): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
console.log(type);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  async function submitHandler(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    const { email, password, username } = inputs;

    setLoading(true);

    const normalizedEmail = email.toLowerCase();

    // ВХОД
    if (type === "signin") {
      const { isValid, error: validationError } = UserValidator.validateSignIn(inputs);
      if (!isValid) {
        antMessage.error(validationError);
        console.log("Ошибка валидации данных", validationError);
        setLoading(false);
        return;
      }

      try {
        const response = await UserApi.signIn({
          email: normalizedEmail,
          password,
        });

        const { data, statusCode, error, message } = response as ApiResponseSuccess<UserWithTokenType>;
        if (error) {
          antMessage.error(error);
          return;
        }
        if (statusCode === 200) {
          antMessage.success(message);
          setUser(data.user);
          setAccessToken(data.accessToken);
          setInputs(inputsInitialState);
          navigate('/');
        }
      } catch (error) {
        if (error instanceof Error) {
          antMessage.error(error.message);
        } else {
          antMessage.error('Unknown server error');
        }
      } finally {
        setLoading(false);
      }
    }

    // РЕГИСТРАЦИЯ
    else {
      const { isValid, error: validationError } = UserValidator.validateSignUp(inputs);
      if (!isValid) {
        antMessage.error(validationError);
        console.log("Ошибка валидации данных", validationError);
        setLoading(false);
        return;
      }

      try {
        const response = await UserApi.signUp({
          email: normalizedEmail,
          password,
          username,
        });

        const { data, statusCode, error, message } = response as ApiResponseSuccess<UserWithTokenType>;
        if (error) {
          antMessage.error(error);
          return;
        }
        if (statusCode === 201) {
          antMessage.success(message);
          setUser(data.user);
          setAccessToken(data.accessToken);
          setInputs(inputsInitialState);
          navigate('/');
        }
      } catch (error) {
        if (error instanceof Error) {
          antMessage.error(error.message);
        } else {
          antMessage.error('Unknown server error');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <div>AuthFORM</div>
      <form onSubmit={submitHandler}>
        <input
          value={inputs.email}
          name={'email'}
          placeholder="Enter your email"
          onChange={onChangeHandler}
          type="email"
          autoFocus
          required
        />
        <input
          value={inputs.password}
          name={'password'}
          placeholder="Enter your password"
          onChange={onChangeHandler}
          type="password"
          required
        />
        {type === 'signup' && (
          <input
            value={inputs.username}
            name={'username'}
            placeholder="Enter your username"
            onChange={onChangeHandler}
            type="text"
            required
          />
        )}
        <Button disabled={loading} color="green" type='submit' text={type === 'signup' ? 'Регистрация' : "Авторизация"} />
      </form>
    </>
  );
}