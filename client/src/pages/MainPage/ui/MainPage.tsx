import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button/ButtonNoDiv";
import styles from './MainPage.module.css';
import { useEffect } from "react";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export function MainPage(): JSX.Element {
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    document.title = 'Main Page'
}, [])

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.block}>
          <h1 className={styles.heading}>Привет, {user?.username || 'пользователь'}!</h1>
        </div>

        <div className={styles.block}>
          <p className={styles.textBlock}>
            {"H.A.L.P! JS WAS HERE! NOW ONLY TS".split('').map((letter, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>
      </div>
      
      {user && (
        <Link to="/tasks">
          <Button className={styles.Btn} text="Перейти к задачам" color="green" type="button" />
        </Link>
      )}

    </div>
  );
}

