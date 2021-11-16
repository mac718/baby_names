import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users/getUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setUser(json.firstName))
      .catch((err) => console.log(err));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
