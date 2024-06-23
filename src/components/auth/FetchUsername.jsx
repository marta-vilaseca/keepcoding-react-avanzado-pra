import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsername } from "../../store/actions";
import { getError, getIsLogged, getUsername } from "../../store/selectors";

export default function FetchUsername() {
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const username = useSelector(getUsername);
  const headerError = useSelector(getError);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchUsername());
    }
  }, [isLogged, dispatch]);

  return (
    <p className="nav__user-greeting">
      {headerError ? (
        `Error: ${headerError}`
      ) : (
        <span>
          Welcome back <strong>{username}</strong>!
        </span>
      )}
    </p>
  );
}
