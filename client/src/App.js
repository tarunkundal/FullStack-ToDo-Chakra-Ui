import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import UserProfile from "./components/profile/UserProfile";
import TaskList from "./components/tasks/TaskList";
import Auth from "./routes/Auth";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ROUTES from "./routes/route";
import TaskProvider from "./store/tasks/TaskProvider";

const App = () => {
  return (
    <>
      <Auth>
        <Switch>
          <Route path={ROUTES.LOGIN} exact component={Login} />
          <Route path={ROUTES.SIGNUP} exact component={Signup} />

          <ProtectedRoutes>
            <TaskProvider>
              <Navbar />
              <Route path={ROUTES.HOME} exact component={Home} />
              <Route path={ROUTES.TASKS} exact component={TaskList} />
              |<Route exact path={ROUTES.PROFILE} component={UserProfile} />
              <Footer />
            </TaskProvider>
          </ProtectedRoutes>
        </Switch>
      </Auth>
    </>
  );
};

export default App;
