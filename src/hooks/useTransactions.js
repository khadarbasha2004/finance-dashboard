import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useTransactions = () => {
  return useContext(AppContext);
};

export default useTransactions;