import { useState } from "react";
import AuthContext from "./AuthContext";
import { AUTH_URLS } from "../../api/url";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveToLocalStorage = (obj) => {
    Object.keys(obj).forEach((item) => {
      localStorage.setItem(item, obj[item]);
    });

    console.log("Saved to localStorage >", obj);
  };

  const logoutUser = () => {
    setUser(null);
    setAccessToken(null);
    setError(null);
    localStorage.clear();
  };

  const signupUser = async (payload) => {
    try {
      setIsLoading(true);

      const response = await fetch(AUTH_URLS.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.success)
        throw new Error(parsedResponse.msg || "Signup failed!");

      const { user: signedUpUserData, accessToken } = parsedResponse;
      setUser(signedUpUserData);
      setAccessToken(accessToken);

      saveToLocalStorage({
        user: JSON.stringify(signedUpUserData),
        accessToken: accessToken,
      });
    } catch (error) {
      console.log("Error: while signing up", error);
      setError("Error: Invalid phone or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (payload) => {
    try {
      setIsLoading(true);

      const response = await fetch(AUTH_URLS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = await response.json();
      console.log("Parsed response:", parsedResponse, "dsfsdf");

      if (!response.ok || !parsedResponse.success)
        throw new Error(parsedResponse.msg || "Login failed!");

      const { user: signedUpUserData, accessToken } = parsedResponse;
      setUser(signedUpUserData);
      setAccessToken(accessToken);

      saveToLocalStorage({
        user: JSON.stringify(signedUpUserData),
        accessToken: accessToken,
      });
    } catch (error) {
      console.error("Error: while loggin in", error);
      setError("Error: Invalid phone or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = () => {
    if (!user) {
      const fromStorage = JSON.parse(localStorage.getItem("user"));
      return fromStorage;
    }

    return user;
  };

  const getAuthenticatedStatus = () => {
    if (!accessToken) {
      const isAuthenticated = localStorage.getItem("accessToken");
      return !!isAuthenticated;
    }

    return !!accessToken;
  };

  const values = {
    loginUser,
    signupUser,
    getAuthenticatedStatus,
    getUser,
    logoutUser,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
