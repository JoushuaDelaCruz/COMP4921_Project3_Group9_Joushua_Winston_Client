import React, { useState } from "react";
import useRequest from "./customs/useRequest";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      <input
        className="ring-2 ring-gray-200 rounded-md px-2 py-1 w-1/4"
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        className="ring-2 ring-gray-200 rounded-md px-2 py-1 w-1/4"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="ring-2 ring-gray-200 rounded-md px-2 py-1 w-1/4"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md"
        onClick={signUp}
      >
        {" "}
        Sign Up{" "}
      </button>
    </div>
  );
};

export default SignUp;
