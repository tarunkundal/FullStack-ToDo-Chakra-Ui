import { useContext, useReducer } from "react";
import authContext from "./auth-context";

const ACTION_TYPES = {
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
};

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  if (action.type === ACTION_TYPES.SET_USER) {
    return {
      ...state,
      user: action.user,
    };
  }

  if (action.type === ACTION_TYPES.UPDATE_USER) {
    return {
      ...state,
      user: action.updatedUserData,
    };
  }

  return initialState;
};

const AuthContextProvider = ({ children }) => {
  const [user, dispatchUserAction] = useReducer(reducer, initialState);

  const setUserDataHandler = (user) => {
    dispatchUserAction({ type: "SET_USER", user: user });
  };

  const updateUserDataHandler = (updatedUserData) => {
    dispatchUserAction({
      type: "UPDATE_USER",
      updatedUserData: updatedUserData,
    });
  };

  const contextValue = {
    user: user.user,
    setUser: setUserDataHandler,
    updateUser: updateUserDataHandler,
  };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export default AuthContextProvider;

export const useStore = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a AuthContextProvider");
  }
  return context;
};
