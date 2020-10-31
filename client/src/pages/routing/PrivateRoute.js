import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./../../redux/hooks";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
