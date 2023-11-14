import { useState } from "react";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/login" exact element={<LogIn setUser={setUser} />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
};

export default App;
