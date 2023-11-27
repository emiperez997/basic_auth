import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Home } from "../Home/Home";
import { NotFound } from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/",
      element: !isAuthenticated ? <Navigate to="/login" /> : <Home />,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}

export { AppRoutes };
