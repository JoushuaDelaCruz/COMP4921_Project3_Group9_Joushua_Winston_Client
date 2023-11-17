import React, { useState } from "react";
import useRequest from "./customs/useRequest";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const navigate = useNavigate();
  const { postRequest } = useRequest();

  const signUp = async () => {
    const body = { username, password, email };
    try {
      const success = await postRequest("auth/register", body);
      if (success) {
        console.log("success");
        navigate("/login");
      } else {
        console.log("fail");
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log("Username or email already in exists");
      }
    }
  };

  const goToHome = () => {
    navigate("/");
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
        <div className="flex flex-col gap-6 items-center justify-center px-5 font-medium text-sm text-gray-400">
          <div className="flex flex-col gap-1 w-full max-w-sm">
            <label htmlFor="email">Username</label>
            <input
              className="peer ring-2 ring-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transform transition-all duration-500 hover:scale-x-105"
              placeholder="Enter your email"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 w-full max-w-sm">
            <label htmlFor="email">Email</label>
            <input
              className="peer ring-2 ring-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transform transition-all duration-500 hover:scale-x-105"
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
              className="ring-2 ring-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transform transition-all duration-500 hover:scale-x-105"
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
            onClick={signUp}
          >
            {" "}
            Create an Account{" "}
          </button>
        </footer>
      </div>
      <h2 className="flex gap-1 text-base font-base font-roboto pt-4">
        Have an account?
        <Link
          to="/login"
          className="font-medium text-green-600 hover:underline"
        >
          Log In
        </Link>
      </h2>
    </div>
  );
};

export default SignUp;
