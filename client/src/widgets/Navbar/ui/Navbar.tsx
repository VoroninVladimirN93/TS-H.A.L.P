import { useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import Button from "@/shared/ui/Button/ButtonNoDiv"
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks"
import { logoutThunk } from "@/entities/user/api/userThunkApi"

export function Navbar(): React.JSX.Element {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.user)

    const navigate = useNavigate()
    // const signOutHandler = async () => {
    //   await UserApi.signOut();
    //   setUser(null);
    //   navigate("/signin");
    // };

    const signOutHandler = async (): Promise<void> => {
        try {
            dispatch(logoutThunk())
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("An unexpected error")
            }
        }
    }

    return (
        <div className={styles.container}>
            <Button
                text="Главная"
                color="green"
                type="button"
                onClick={() => navigate("/")}
            />
            {user ? (
                <>
                    <Button
                        text="Задачи"
                        color="green"
                        type="button"
                        onClick={() => navigate("/tasks")}
                    />
                    <div className={styles.profileInfo}>
                        {`Привет, ${user.username} email: ${user.email}`}
                    </div>
                    <Button
                        text="Выход"
                        color="red"
                        type="button"
                        className={styles.logoutBtn}
                        onClick={signOutHandler}
                    />
                </>
            ) : (
                <div className={styles.authBtns}>
                    <Button
                        text="Вход"
                        color="green"
                        type="button"
                        onClick={() => navigate("/signin")}
                    />
                    <Button
                        text="Регистрация"
                        color="green"
                        type="button"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            )}
        </div>
    )
}
