import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import useRequest from "./pages/customs/useRequest";
import Profile from "./Pages/Profile";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import Notifications from "./pages/Notifications";

const App = () => {
  const { getRequest } = useRequest();
  const [cookies, setCookie, removeCookie] = useCookies(["session", "user"]);
  const [user, setUser] = useState(cookies.user);

  useEffect(() => {
    const checkSession = async () => {
      const response = await getRequest("verify");
      if (!response.authenticated) {
        setUser(null);
        redirect("/");
        return;
      }
      setUser(response.user);
    };

    checkSession();
  }, [setCookie, removeCookie]);

  const isUser = async () => {
    if (user) {
      window.location.href = "/";
    }
    return null;
  };

  const profileLoader = async () => {
    if (!user) {
      window.location.href = "/";
      return null;
    }
    const response = await getRequest(`profile/friends`);
    return response;
  };

  const notificationsLoader = async () => {
    if (!user) {
      window.location.href = "/";
      return null;
    }
    const response = await getRequest(`notifications/friends`);
    return response;
  };

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home user={user} />} />
        <Route
          path="/login"
          loader={() => isUser()}
          exact
          element={<LogIn setUser={setUser} />}
        />
        <Route
          loader={() => profileLoader()}
          path="/profile"
          exact
          element={<Profile user={user} />}
        />
        <Route
          path="/signup"
          loader={() => isUser()}
          exact
          element={<SignUp />}
        />
        <Route
          loader={() => notificationsLoader()}
          path="/notifications"
          exact
          element={<Notifications />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
};

export default App;
