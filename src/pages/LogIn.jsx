import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "./customs/useRequest";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logInRequest } = useRequest();
  const navigation = useNavigate();

  const login = async () => {
    const credentials = { email, password };
    const success = await logInRequest(credentials);
    if (success) {
      navigation("/");
    } else {
      console.log("fail");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
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
        onClick={login}
      >
        {" "}
        Log In{" "}
      </button>
    </div>
  );
};

export default LogIn;
