import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button/ButtonNoDiv";
import { UserType } from "../../../entities/user/model";
import styles from './MainPage.module.css';

type Props = {
  user: UserType | null;
};

function MainPage({ user }: Props): JSX.Element {
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

export default MainPage;
