import { useCookies } from "react-cookie";
import axios from "axios";

const useRequest = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const getConfig = (data) => {
    const config = {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
      cookie: cookie,
    };
    return config;
  };

  const urlConstructor = (endpoint) => {
    return import.meta.env.VITE_SERVER_URL + endpoint;
  };

  const getRequest = async (endpoint, data = undefined) => {
    try {
      const url = urlConstructor(endpoint);
      const response = await axios.get(url, getConfig(data));
      return response.data;
    } catch (e) {
      if (e.response.status === 404) {
        window.location.href = "/404";
        return;
      }
      if (e.response.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (e.response.status === 403) {
        throw e;
      }
      alert(e.response.data.message);
    }
  };

  const postRequest = async (endpoint, data = undefined) => {
    try {
      const url = urlConstructor(endpoint);
      const response = await axios.post(url, getConfig(data));
      return response.data;
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        window.location.href = "/404";
        return;
      }
      if (e.response.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (e.response.status === 403) {
        throw e;
      }
      alert(e.response.data.message);
    }
  };

  const setUpCookie = (token) => {
    const expireTime = 60 * 60 * 1000;
    setCookie("token", token, {
      path: "/",
      maxAge: expireTime,
      sameSite: "strict",
    });
  };

  const logInRequest = async (credentials) => {
    try {
      const endpoint = "auth/login";
      const response = await postRequest(endpoint, credentials);
      if (response.token) {
        setUpCookie(response.token);
        return null;
      }
      return response.message;
    } catch (e) {
      return e.response.data.message;
    }
  };

  const logOutRequest = async () => {
    removeCookie("token");
  };

  return { getRequest, postRequest, logInRequest, logOutRequest };
};

export default useRequest;
