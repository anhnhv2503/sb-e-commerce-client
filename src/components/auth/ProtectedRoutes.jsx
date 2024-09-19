import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.state.location } }}
            />
          );
        }

        if (roles && !roles.includes(user.role)) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
