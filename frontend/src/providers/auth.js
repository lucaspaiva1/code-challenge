import React, { useEffect, useState } from "react";
import userService from "../services/user";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = userService.getCurrentUser();
    if (userStorage) {
      setUser(userStorage);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
