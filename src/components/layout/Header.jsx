import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Nodepop from "../../assets/nodepop.svg?react";
import { logout } from "../../services/loginService";
import { authLogout, uiResetError } from "../../store/actions";
import { getError, getIsLogged } from "../../store/selectors";
import { ConfirmationButton } from "../common/ConfirmationButton";
import "./header.css";

export default function Header() {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const resetError = () => {
    dispatch(uiResetError());
    setShowConfirmLogout(false);
  };
  const headerError = useSelector(getError);

  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
    dispatch(authLogout());
  };

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
          ERROR: {headerError.status}: {headerError.message}
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
