import React, { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { message as antMessage } from "antd"
import styles from "./AuthForm.module.css"
import UserValidator from "@/entities/user/model/User.validator"
import Button from "@/shared/ui/Button/ButtonNoDiv"
import { useAppDispatch } from "@/shared/hooks/reduxHooks"
import {
    authorizationThunk,
    registrationThunk,
} from "@/entities/user/api/userThunkApi"
import { unwrapResult } from "@reduxjs/toolkit"

type Props = {
    type: "signin" | "signup"
    // setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

type InputsType = {
    email: string
    password: string
    username: string
}

const inputsInitialState = { email: "", password: "", username: "" }

export function AuthForm({ type }: Props): JSX.Element {
    const dispatch = useAppDispatch()

    const [inputs, setInputs] = useState<InputsType>(inputsInitialState)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    async function submitHandler(
        event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
    ) {
        event.preventDefault()
        const { email, password, username } = inputs

        setLoading(true)

        const normalizedEmail = email.toLowerCase()

        // ВХОД
        if (type === "signin") {
            const { isValid, error: validationError } =
                UserValidator.validateSignIn(inputs)
            if (!isValid) {
                antMessage.error(validationError)
                setLoading(false)
                return
            }
            try {
                const resultAction = await dispatch(
                    authorizationThunk({
                        email: normalizedEmail,
                        password,
                    }),
                )
                unwrapResult(resultAction)
                navigate("/")
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                } else {
                    console.log("An unexpected error")
                }
            }
        }
        // РЕГИСТРАЦИЯ
        else {
            const { isValid, error: validationError } =
                UserValidator.validateSignUp(inputs)
            if (!isValid) {
                antMessage.error(validationError)
                setLoading(false)
                return
            }
            try {
                event.preventDefault()
                const resultAction = await dispatch(
                    registrationThunk({
                        email: normalizedEmail,
                        password,
                        username,
                    }),
                )
                unwrapResult(resultAction)
                navigate("/")
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message)
                } else {
                    console.log("An unexpected error")
                }
            }
        }
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={submitHandler} className={styles.form}>
                <input
                    value={inputs.email}
                    name={"email"}
                    placeholder="Enter your email"
                    onChange={onChangeHandler}
                    type="email"
                    autoFocus
                    required
                    className={styles.input}
                />
                <input
                    value={inputs.password}
                    name={"password"}
                    placeholder="Enter your password"
                    onChange={onChangeHandler}
                    type="password"
                    required
                    className={styles.input}
                />
                {type === "signup" && (
                    <input
                        value={inputs.username}
                        name={"username"}
                        placeholder="Enter your username"
                        onChange={onChangeHandler}
                        type="text"
                        required
                        className={styles.input}
                    />
                )}
                <Button
                    disabled={loading}
                    color="green"
                    type="submit"
                    text={type === "signup" ? "Регистрация" : "Авторизация"}
                />
            </form>
        </div>
    )
}
