const React = require("react");

const authContext = React.createContext({
  user: null,
  setUser: (user) => {},
  updateUser: (updatedUserData) => {},
});

export default authContext;
