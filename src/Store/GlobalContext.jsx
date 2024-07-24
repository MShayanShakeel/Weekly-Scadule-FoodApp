// GlobalContext.js
import React, { createContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [getCardId, setGetCardId] = useState("");
  const [globallyStore, setGloballyStore] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        selectedWeek,
        setSelectedWeek,
        getCardId,
        setGetCardId,
        // storeAllValue,
        // setstoreAllValue,
        globallyStore,
        setGloballyStore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
