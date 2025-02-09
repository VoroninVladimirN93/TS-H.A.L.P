import { useNavigate } from "react-router-dom";
import Button from "../../shared/ui/Button/ButtonNoDiv";
import styles from './Navbar.module.css';
import { UserType } from "../../entities/user/model";

type Props ={
  user:UserType | null,
  setUser:React.Dispatch<React.SetStateAction<UserType | null>>,
}

function Navbar({user,setUser}:Props) {

    const navigate = useNavigate()
const signOutHandler=()=>{
    setUser(null)
    navigate('/signin')
}
    return (<div className={styles.container}>
        <Button
          text='Главная'
          color='green'
          type='button'
          onClick={() => navigate('/')}
        />
        {user ? (
          <>
            <Button
              text='Задачи'
              color='green'
              type='button'
              onClick={() => navigate('/tasks')}
            />
            <div>{`Привет ${user?.username}`}</div>

            <Button
              text='Выход'
              color='red'
              type='button'
              onClick={signOutHandler}
            />
          </>
        ) : (
          <>
            <Button
              text='Вход'
              color='green'
              type='button'
              onClick={() => navigate(`/signin`)}
            />
            <Button
              text='Регистрация'
              color='green'
              type='button'
              onClick={() => navigate(`/signup`)}
            />
          </>
        )}
      </div>
    );
}

export default Navbar;