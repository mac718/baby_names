import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  console.log("url", location);
  useEffect(() => {
    fetch("/api/v1/users/getUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setUser(json.firstName))
      .catch((err) => console.log(err));
  }, [location]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
