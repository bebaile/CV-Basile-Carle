import React, { createContext, useState } from "react";

const Context = createContext();

export default Context;

export function ContextProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </Context.Provider>
  );
}
