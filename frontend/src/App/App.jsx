import { useEffect, useState } from "react";
import "./App.css";

import { Layout } from "../Layout/Layout";
import { Message } from "../Message/Message";

import { AppRoutes } from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { useMessage } from "../hooks/useMessage";

function App() {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { message } = useMessage();

  return (
    <Layout>
      {message && <Message />}
      <BrowserRouter>
        <AppRoutes
          user={user}
          setUser={setUser}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </BrowserRouter>
    </Layout>
  );
}

export default App;
