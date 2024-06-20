import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useAuth } from "../../context/AuthContextProvider";
import { getIsLogged, getUsername, getUsernameError } from "../../store/selectors";

export default function FetchUsername() {
  // const [username, setUsername] = useState("");
  // const [headerError, setHeaderError] = useState(null);
  // const { isLogged } = useAuth();
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const username = useSelector(getUsername);
  const headerError = useSelector(getUsernameError);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchUsername());
    }
  }, [isLogged, dispatch]);

  // useEffect(() => {
  //   if (isLogged) {
  //     const fetchTheUsername = async () => {
  //       try {
  //         const accessToken = storage.get("auth");
  //         if (accessToken) {
  //           const fetchedUsername = await getUserName(accessToken);
  //           setUsername(fetchedUsername);
  //         }
  //       } catch (error) {
  //         setHeaderError(`Error fetching username: ${error.message}`);
  //       }
  //     };
  //     fetchTheUsername();
  //   }
  // }, [isLogged]);

  return <p className="nav__user-greeting">{headerError ? `Error: ${headerError}` : `Welcome back <strong>${username}</strong>!`}</p>;
}
