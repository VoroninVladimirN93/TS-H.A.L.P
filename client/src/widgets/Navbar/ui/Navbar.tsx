import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { UserApi, } from "@/entities/user";
import Button from "@/shared/ui/Button/ButtonNoDiv";
import { useUser } from "@/shared/hooks/useUser";


export function Navbar() {
  const {user,setUser} = useUser()
  const navigate = useNavigate();
  const signOutHandler = async () => {
    await UserApi.signOut();
    setUser(null);
    navigate("/signin");
  };

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
  );
}
