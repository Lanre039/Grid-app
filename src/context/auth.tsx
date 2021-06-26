import React, { createContext, useReducer } from "react";
import SecureLS from "secure-ls";
import { Action, State, UserData } from "./types";

const config = {
  encodingType: "des",
  isCompression: true,
  encryptionSecret: "my-secret-key",
};

// ENCRYPT THE DATA THEN SAVE TO LOCAL STORAGE
const ls = new SecureLS(config);
const localStore = {
  get: (item: string) => ls.get(item),
  set: (item: string, data = {}) => ls.set(item, data),
  remove: (item: string) => ls.remove(item),
  removeAll: () => ls.removeAll(),
};

const initialState: State = {
  user: null,
};

// CHECK IF USER HAS PREVIOUSLY LOGGED-IN
if (ls.get("userData")) {
  const userData = localStore.get("userData");
  initialState.user = userData;
}

const AuthContext = createContext({
  user: null,
  login: (user: UserData) => {},
  logout: () => {},
});

export function authReducer(state: State, action: Action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: UserData) {
    localStore.set("userData", userData);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStore.removeAll();
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    ></AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, localStore };
