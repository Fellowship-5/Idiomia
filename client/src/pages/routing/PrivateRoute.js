import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./../../redux/hooks";
import Spinner from "./../../components/Spinner";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="position-absolute" style={{ top: "50%", left: "50%" }}>
        <Spinner animation="grow" />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
