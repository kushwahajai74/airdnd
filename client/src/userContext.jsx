import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isAuthenticated) {
      axios.get("/profile").then(
        ({ data }) => {
          setUser(data.userData);
          setIsAuthenticated(true);
          setIsLoading(false);
        },
        (err) => {
          setIsLoading(false);
          setIsAuthenticated(false);
          setUser(null);
        }
      );
    }
  }, [user, isAuthenticated, isLoading]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        setIsAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
