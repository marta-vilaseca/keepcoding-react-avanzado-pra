import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Nodepop from "../../assets/nodepop.svg?react";
import { logout } from "../../services/loginService";
import { authLogout } from "../../store/actions";
import { getIsLogged } from "../../store/selectors";
import { ConfirmationButton } from "../common/ConfirmationButton";
import "./header.css";

export default function Header() {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const [headerError, setHeaderError] = useState(null);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const navigate = useNavigate();
  // const { onLogout } = useAuth();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     onLogout();
  //     navigate("/login");
  //   } catch (error) {
  //     setHeaderError(`Logout failed: ${error.message}`);
  //   }
  // };

  const handleLogout = async () => {
    await logout();
    dispatch(authLogout());
  };

  const resetError = () => setHeaderError(null);

  const confirmLogout = () => {
    setShowConfirmLogout(true);
  };

  const cancelLogout = () => {
    setShowConfirmLogout(false);
  };

  return (
    <>
      {headerError && (
        <div className="error-message" onClick={resetError}>
          ERROR: {headerError}
        </div>
      )}
      <header className="header">
        <div className="header__inner">
          <h1 className={`logo ${!isLogged ? "centered" : ""}`}>
            <Link to={`/`}>
              <Nodepop className="icon" /> <span>NodePop</span>
            </Link>
          </h1>
          {isLogged && (
            <nav>
              {/* <FetchUsername /> */}
              <ul className="nav__navigation">
                <li>
                  <NavLink to="/adverts" end>
                    Adverts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adverts/new">Create new advert</NavLink>
                </li>
                <li>
                  <ConfirmationButton
                    buttonClassName="nav__button"
                    buttonText="Log Out"
                    dialogText="Are you sure you want to log out?"
                    confirmAction={handleLogout}
                    confirmActionText="log out"
                    cancelActionText="cancel"
                    error={headerError}
                  />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
