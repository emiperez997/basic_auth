import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsAuthenticated(true);
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const login = (user, token) => {
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
