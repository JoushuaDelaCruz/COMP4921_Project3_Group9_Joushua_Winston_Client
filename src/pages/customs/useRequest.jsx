import { useCookies } from "react-cookie";
import axios from "axios";

const useRequest = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["session"]);

  const getConfig = (data) => {
    const config = {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    return config;
  };

  const getRequest = async (url, data = undefined) => {
    try {
      const response = await axios.get(url, getConfig(data));
    } catch (e) {
      console.log(e);
    }
  };

  const postRequest = async (url, data = undefined) => {
    try {
      const response = await axios.post(url, getConfig(data));
    } catch (e) {
      console.log(e);
    }
  };

  const setUpCookie = () => {
    const expireTime = 60 * 60 * 1000;
    setCookie("session", sessionID, {
      path: "/",
      maxAge: expireTime,
      sameSite: "strict",
    });
  };

  const logInRequest = async (credentials) => {
    const url = import.meta.env.VITE_API + "user/login";
    const sessionID = await postRequest(url, credentials);
    if (sessionID) {
      setUpCookie();
      return true;
    }
    return false;
  };

  const logOutRequest = async () => {
    console.log("Logging out");
  };

  return { getRequest, postRequest, logInRequest, logOutRequest };
};

export default useRequest;
