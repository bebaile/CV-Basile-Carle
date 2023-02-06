import React, { createContext, useState } from "react";

const Context = createContext();

export default Context;

export function ContextProvider({ children }) {
  const [isConnected, setIsConnected] = useState(
    sessionStorage.getItem("isConnected")
  );

  const [infoUser, setInfoUser] = useState({
    email: sessionStorage.getItem("email"),
    company: sessionStorage.getItem("company"),
    type: sessionStorage.getItem("type"),
  });

  const [isSubNavBarVisible, setIsSubNavBarVisible] = useState(false);

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isConnected,
        setIsConnected,
        infoUser,
        setInfoUser,
        isSubNavBarVisible,
        setIsSubNavBarVisible,
      }}
    >
      {children}
    </Context.Provider>
  );
}
