import { useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "./customs/useRequest";

const LogIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { logInRequest } = useRequest();

  const validateEmail = async () => {
    if (email.length < 1 || !email.includes("@")) {
      return false;
    }
    setErrMsg("");
    return true;
  };

  const validatePassword = async () => {
    if (password.length < 1) {
      return false;
    }
    setErrMsg("");
    return true;
  };

  const makeLoginRequest = async () => {
    const credentials = { email, password };
    const { user } = await logInRequest(credentials);
    if (user) {
      setUser(user);
      // goToHome();
      return;
    } else {
      setErrMsg(response.message);
    }
  };

  const login = async () => {
    const isUsernameValidated = await validateEmail();
    const isPasswordValidated = await validatePassword();
    if (!isUsernameValidated || !isPasswordValidated) {
      setErrMsg("Please enter valid credentials");
      return;
    }

    await makeLoginRequest();
  };

  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-5 bg-mint-cream sm:justify-center">
      <div className="w-full flex flex-col gap-5 font-roboto bg-feldgrau rounded-sm sm:rounded-md text-white max-w-2xl py-5 shadow-lg shadow-slate-800">
        <header className="text-4xl border-b text-center border-gray-400 pb-5 font-roboto font-semibold w-full">
          <h1
            className=" hover:transform hover:transition-all hover:duration-100 text-celadon hover:animate-bounce cursor-pointer font-logo"
            onClick={goToHome}
          >
            MakeItHappen
          </h1>
        </header>
        <div
          className={
            "flex flex-col gap-8 items-center justify-center px-5 font-medium text-sm" +
            (errMsg ? " text-red-500" : " text-gray-400")
          }
        >
          {errMsg && (
            <h2 className="text-base animate-bounce-twice">{errMsg}</h2>
          )}
          <div className="flex flex-col gap-1 w-full max-w-sm">
            <label htmlFor="email">Email</label>
            <input
              className={
                "ring-2 rounded px-3 py-2 focus:outline-none focus:ring-2 text-black focus:ring-green-600 transform transition-color duration-200" +
                (errMsg ? " ring-red-500" : "ring-gray-200 ")
              }
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-sm">
            <label htmlFor="password">Password</label>
            <input
              className={
                "ring-2 rounded px-3 py-2 focus:outline-none focus:ring-2 text-black focus:ring-green-600 transform transition-color duration-200" +
                (errMsg ? " ring-red-500" : "ring-gray-200 ")
              }
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <footer className="w-full flex justify-center mt-5">
          <button
            className=" bg-celadon text-feldgrau rounded-full px-10 py-2 font-medium hover:bg-celadon/70 focus:bg-celadon/70 active:bg-battleship-grey transform transition-colors duration-200"
            onClick={login}
          >
            {" "}
            Log In{" "}
          </button>
        </footer>
      </div>
      <h2 className="flex gap-1 text-base font-base font-roboto pt-4">
        Don't have an yet?
        <Link
          to="/signUp"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </h2>
    </div>
  );
};

export default LogIn;
