// GlobalContext.js
import React, { createContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [getCardId, setGetCardId] = useState("");

  return (
    <GlobalContext.Provider
      value={{ selectedWeek, setSelectedWeek, getCardId, setGetCardId }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
