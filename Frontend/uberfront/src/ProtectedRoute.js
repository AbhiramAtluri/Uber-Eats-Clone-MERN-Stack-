import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

function ProtectedRoute({ component: Component, ...restOfProps }) {

  const [cookies, setCookie, removeCookie] = useCookies(["uber"]);
    const isAuthenticated = cookies.uber;
    console.log("this", isAuthenticated);
    console.log(cookies.user)
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
  
  export default ProtectedRoute;