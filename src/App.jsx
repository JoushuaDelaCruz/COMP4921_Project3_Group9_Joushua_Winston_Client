import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import useRequest from "./pages/customs/useRequest";
import Profile from "./pages/profile";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const { getRequest, logOutRequest, logInRequest } = useRequest();

  useEffect(() => {
    const checkSession = async () => {
      const sessionValidity = await getRequest("verify");
      if (!sessionValidity) {
        setUser(null);
        return;
      }
    };

    checkSession();
  }, [logOutRequest, logInRequest]);

  const isUser = async () => {
    if (user) {
      window.location.href = "/";
    }
    return null;
  };

  const profileLoader = async ({ params }) => {
    const endpoint = `profile/${params.username}`;
    const response = await getRequest(endpoint);
    return response;
  };

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home user={user} />} />
        <Route
          path="/login"
          loader={isUser}
          exact
          element={<LogIn setUser={setUser} />}
        />
        <Route path="/signup" loader={isUser} exact element={<SignUp />} />
        <Route
          path="/profile/:username"
          exact
          loader={profileLoader}
          element={<Profile user={user} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
};

export default App;
