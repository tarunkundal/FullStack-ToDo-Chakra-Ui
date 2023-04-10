import { Redirect } from "react-router-dom";
import { useStore } from "../store/authStore/AuthContextProvider";

const ProtectedRoutes = ({ children }) => {
  const { user } = useStore();

  if (!user) {
    return <Redirect to={"/login"} />;
  }

  return <> {children}</>;
};

export default ProtectedRoutes;
