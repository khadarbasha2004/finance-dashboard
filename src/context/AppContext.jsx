import { createContext, useState } from "react";
import mockData from "../data/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockData);

  return (
    <AppContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </AppContext.Provider>
  );
};