import { Link } from "react-router-dom";
import Button from "../../../shared/ui/Button/ButtonNoDiv";
import { UserType } from "../../../entities/user/model";

type Props = {
  user: UserType | null;
};

function MainPage({ user }:Props): JSX.Element {
  return (
    <>
      <div>H.A.L.P! JS WAS HERE! NOW ONLY TS</div>
      {user && <Link to={"/tasks"}>
        <Button text="Перейти к задачам" color="green" type="button" />
      </Link>}
    </>
  );
}

export default MainPage;
