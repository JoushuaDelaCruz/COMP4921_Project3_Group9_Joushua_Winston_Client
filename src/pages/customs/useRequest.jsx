import { useCookies } from "react-cookie";

const useRequest = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["session"]);

  const getConfig = (method, body) => {
    const config = {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };
    return config;
  };

  const logOutRequest = async () => {
    const success = await postRequest("auth/logout");
    if (success) {
      removeCookie("session");
      window.location.href = "/";
    }
  };

  const urlConstructor = (endpoint) => {
    return import.meta.env.VITE_SERVER_URL + endpoint;
  };

  const getRequest = async (endpoint, body = undefined) => {
    try {
      const url = urlConstructor(endpoint);
      const response = await fetch(url, getConfig("GET", body));
      const data = await response.json();
      return data;
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
      if (e.response.status === 400) {
        await logOutRequest();
      }
      alert(e.response.data.message);
    }
  };

  const postRequest = async (endpoint, body = undefined) => {
    try {
      const url = urlConstructor(endpoint);
      const response = await fetch(url, getConfig("POST", body));
      const data = await response.json();
      return data;
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
      if (e.response.status === 400) {
        await logOutRequest();
      }
      alert(e.response.data.message);
    }
  };

  const setUpCookie = (session) => {
    const expireTime = 60 * 60 * 1000;
    setCookie("session", session, {
      path: "/",
      maxAge: expireTime,
      sameSite: "strict",
    });
  };

  const logInRequest = async (credentials) => {
    try {
      const endpoint = "auth/login";
      const response = await postRequest(endpoint, credentials);
      if (response.success) {
        setUpCookie(response.session);
        return response;
      }
      return response;
    } catch (e) {
      return e.response.message;
    }
  };

  return { getRequest, postRequest, logInRequest, logOutRequest };
};

export default useRequest;
