<<<<<<< HEAD
import React from "react";
import Calendar from "./Components/CalendarComponent";

const App = () => {
  return (
    <div>
      <Calendar/>
    </div>
  );
=======
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
  const [userAuth, setUserAuth] = useState(false);
  const { getRequest, logOutRequest, logInRequest } = useRequest();

  useEffect(() => {
    const checkSession = async () => {
      const sessionValidity = await getRequest("verify");
      setUserAuth(sessionValidity);
    };

    checkSession();
  }, [logOutRequest, logInRequest]);

  const isUserAuth = async () => {
    if (userAuth) {
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
        <Route index element={<Home userAuth={userAuth} />} />
        <Route path="/login" loader={isUserAuth} exact element={<LogIn />} />
        <Route path="/signup" loader={isUserAuth} exact element={<SignUp />} />
        <Route
          path="/profile/:username"
          exact
          loader={profileLoader}
          element={<Profile userAuth={userAuth} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
>>>>>>> main
};

export default App;
