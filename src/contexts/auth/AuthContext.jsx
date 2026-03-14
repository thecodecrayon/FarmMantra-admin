import { createContext } from "react";

const AuthContext = createContext({
  getAuthenticatedStatus: () => {},
  getUser: () => {},
  loginUser: () => {},
  signupUser: () => {},
  logoutUser: () => {},
  isLoading: false,
  error: null,
});

export default AuthContext;
