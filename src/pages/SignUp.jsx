import React, { useState } from "react";
import useRequest from "./customs/useRequest";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { postRequest } = useRequest();

  const signUp = () => {
    console.log("signUp");
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signUp}> </button>
    </div>
  );
};

export default SignUp;
