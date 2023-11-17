import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useRequest from "./customs/useRequest";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { logInRequest } = useRequest();
  const navigation = useNavigate();

  const login = async () => {
    const credentials = { email, password };
    const success = await logInRequest(credentials);
    if (success) {
      goToHome();
      return;
    } else {
      setIsInvalid(true);
    }
  };

  const goToHome = () => {
    navigation("/");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-5 bg-mint-cream sm:justify-center">
      <div className="w-full flex flex-col gap-5 font-roboto bg-feldgrau rounded-sm sm:rounded-md text-white max-w-2xl py-5 shadow-lg shadow-slate-800">
        <header className="text-3xl border-b text-center border-gray-400 pb-5 font-roboto font-semibold w-full">
          <h1
            className=" hover:transform hover:transition-all hover:duration-100 hover:animate-bounce cursor-pointer"
            onClick={goToHome}
          >
            EvenTogether
          </h1>
        </header>
        <div
          className={
            "flex flex-col gap-6 items-center justify-center px-5 font-medium text-sm" +
            (isInvalid ? " text-red-500" : "text-gray-400")
          }
        >
          {isInvalid && (
            <h2 className="text-base animate-bounce-twice">
              Incorrect credentials, please try again.
            </h2>
          )}
          <div className="flex flex-col gap-1 w-full max-w-sm">
            <label htmlFor="email">Email</label>
            <input
              className={
                "ring-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transform transition-all duration-500 hover:scale-x-105" +
                (isInvalid ? " ring-red-500" : "ring-gray-200 ")
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
                "ring-2 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transform transition-all duration-500 hover:scale-x-105" +
                (isInvalid ? " ring-red-500" : "ring-gray-200 ")
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
            className=" bg-green-500 text-white rounded-full px-10 py-2 font-medium hover:bg-green-700 focus:bg-green-700 active:bg-green-900 transform transition-colors duration-200"
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
          className="font-medium text-green-600 hover:underline"
        >
          Sign up
        </Link>
      </h2>
    </div>
  );
};

export default LogIn;
