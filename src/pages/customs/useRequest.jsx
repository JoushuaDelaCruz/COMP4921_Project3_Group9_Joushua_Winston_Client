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

  const urlConstructor = (endpoint) => {
    return import.meta.env.VITE_SERVER_URL + endpoint;
  };

  const getRequest = async (endpoint, data = undefined) => {
    const url = urlConstructor(endpoint);
    const response = await axios.get(url, getConfig(data));
    return response.data;
  };

  const postRequest = async (endpoint, data = undefined) => {
    const url = urlConstructor(endpoint);
    const response = await axios.post(url, getConfig(data));
    return response.data;
  };

  const setUpCookie = (sessionID) => {
    const expireTime = 60 * 60 * 1000;
    setCookie("session", sessionID, {
      path: "/",
      maxAge: expireTime,
      sameSite: "strict",
    });
  };

  const logInRequest = async (credentials) => {
    try {
      const endpoint = "auth/login";
      const sessionID = await postRequest(endpoint, credentials);
      if (sessionID) {
        setUpCookie(sessionID);
        return true;
      }
      return false;
    } catch (e) {
      alert("Internal error, please try again");
      return false;
    }
  };

  const logOutRequest = async () => {
    console.log("Logging out");
  };

  return { getRequest, postRequest, logInRequest, logOutRequest };
};

export default useRequest;
