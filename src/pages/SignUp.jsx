import React, { useState } from "react";
import useRequest from "./customs/useRequest";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameErr, setUsernameErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);

  const navigate = useNavigate();
  const { getRequest, postRequest } = useRequest();

  const validateUsername = async () => {
    if (username.length < 1) {
      setUsernameErr("Please enter a username");
      return false;
    }
    const response = await getRequest(`auth/checkUsernameExists/${username}`);
    if (response.is_exists) {
      setUsernameErr(response.message);
      return false;
    }
    setUsernameErr(null);
    return true;
  };

  const validatePassword = async () => {
    if (password.length < 1) {
      setPasswordErr("Please enter a password");
      return false;
    }
    if (password.length <= 10) {
      setPasswordErr("Password must be at least 10 characters long");
      return false;
    }
    if (!password.match(/[a-z]/)) {
      setPasswordErr("Password must contain a lowercase letter");
      return false;
    }
    if (!password.match(/[A-Z]/)) {
      setPasswordErr("Password must contain an uppercase letter");
      return false;
    }
    if (!password.match(/[0-9]/)) {
      setPasswordErr("Password must contain a number");
      return false;
    }
    if (!password.match(/[^a-zA-Z\d]/)) {
      setPasswordErr("Password must contain a special character");
      return false;
    }
    setPasswordErr(null);
    return true;
  };

  const validateEmail = async () => {
    if (email.length < 1 || !email.includes("@")) {
      setEmailErr("Please enter an email");
      return false;
    }
    const response = await getRequest(`auth/checkEmailExists/${email}`);
    if (response.is_exists) {
      setEmailErr(response.message);
      return false;
    }
    setEmailErr(null);
    return true;
  };

  const signUpUserReq = async () => {
    const body = { username, password, email };
    try {
      const success = await postRequest("auth/register", body);
      if (success) {
        navigate("/login");
      } else {
        console.log("fail");
      }
    } catch (error) {
      if (error.response.status === 403) {
        console.log("Username or email already in exists");
      }
    }
  };

  const signUp = async () => {
    const isUsernameValid = await validateUsername();
    const isEmailValid = await validateEmail();
    const isPasswordValid = await validatePassword();

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    await signUpUserReq();
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-5 bg-mint-cream sm:justify-center font-roboto">
      <div className="w-full flex flex-col gap-5 bg-feldgrau rounded-sm sm:rounded-md text-white max-w-2xl py-5 shadow-lg shadow-slate-800">
        <header className="text-3xl border-b text-center border-gray-400 pb-5 font-semibold w-full">
          <h1
            className=" hover:transform hover:transition-all hover:duration-100 hover:animate-bounce cursor-pointer"
            onClick={goToHome}
          >
            EvenTogether
          </h1>
        </header>
        <div className="flex flex-col gap-3 items-center justify-center px-5 font-medium text-sm">
          <div
            className={`flex flex-col gap-1 w-full max-w-sm ${
              !usernameErr ? "text-gray-400" : "text-red-500"
            } relative`}
          >
            <label htmlFor="username">Username</label>
            <input
              className={`peer ring-2 ${
                !usernameErr ? "ring-gray-200" : "ring-red-500"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-700 focus:ring-green-600 transform transition-color duration-200`}
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h3 className={!usernameErr ? `text-transparent` : `text-current`}>
              {usernameErr || "Placeholder"}
            </h3>
          </div>
          <div
            className={`flex flex-col gap-1 w-full max-w-sm ${
              !emailErr ? "text-gray-400" : "text-red-500"
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              className={`peer ring-2 ${
                !emailErr ? "ring-gray-200" : "ring-red-500"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-700 focus:ring-green-600 transform transition-color duration-200`}
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3 className={!emailErr ? `text-transparent` : `text-current`}>
              {emailErr || "Placeholder"}
            </h3>
          </div>
          <div
            className={`flex flex-col gap-1 w-full max-w-sm ${
              !passwordErr ? "text-gray-400" : "text-red-500"
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              className={`peer ring-2 ${
                !passwordErr ? "ring-gray-200" : "ring-red-500"
              } rounded px-3 py-2 focus:outline-none focus:ring-2 text-gray-700 focus:ring-green-600 transform transition-color duration-200`}
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h3 className={!passwordErr ? `text-transparent` : `text-current`}>
              {passwordErr || "Placeholder"}
            </h3>
          </div>
        </div>
        <footer className="w-full flex justify-center mt-2">
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
