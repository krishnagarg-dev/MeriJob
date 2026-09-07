import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("employerUser") || "null");
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("employerToken")
  );

  const login = useCallback((newToken, newUser, rememberMe = false) => {
    localStorage.setItem("employerToken", newToken);
    localStorage.setItem("employerUser", JSON.stringify(newUser));

    if (rememberMe) {
      localStorage.setItem("employerRememberMe", "true");
    } else {
      localStorage.removeItem("employerRememberMe");
    }

    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employerUser");
    localStorage.removeItem("employerRememberMe");
    localStorage.removeItem("company");

    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token && user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;