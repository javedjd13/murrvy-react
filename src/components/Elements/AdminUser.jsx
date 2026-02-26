import { useEffect, useState } from "react";
import { User } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { firebase_app } from "@/Config/firebase";
import { ROUTE_PATHS } from "@/router";
import {
  AUTH_SESSION_CHANGE_EVENT,
  clearAuthSession,
  isUserAuthenticated,
} from "@/lib/storage/authSession";
import { Logins, Registers } from "@/Constant";

const getIsLoggedIn = () =>
  Boolean(firebase_app.auth()?.currentUser) || isUserAuthenticated();

const AdminUser = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn);

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(getIsLoggedIn());
    };

    syncLoginState();
    const unsubscribe = firebase_app.auth().onAuthStateChanged(syncLoginState);
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, syncLoginState);
    window.addEventListener("storage", syncLoginState);

    return () => {
      unsubscribe?.();
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, syncLoginState);
      window.removeEventListener("storage", syncLoginState);
    };
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    firebase_app.auth().signOut().catch(() => {});
    setIsLoggedIn(false);
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <li className="onhover-dropdown account-dropbox">
      <div className="cart-media">
        <User />
      </div>
      <div className="onhover-div profile-dropdown">
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to={ROUTE_PATHS.USER_DASHBOARD} className="d-block text-decoration-none">
                  User Dashboard
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="d-block w-100 text-start border-0 bg-transparent p-0"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={ROUTE_PATHS.LOGIN} className="d-block text-decoration-none">
                  {Logins}
                </Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.REGISTER} className="d-block text-decoration-none">
                  {Registers}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </li>
  );
};
export default AdminUser;
