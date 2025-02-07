import { createContext, useContext, useState, ReactNode } from "react";

const TransactionSearchContext = createContext<{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }>({
    searchTerm: "",
    setSearchTerm: () => {},
  });


  // Provider component
export const TransactionSearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    console.log(searchTerm, "searchTerm");
    return (
      <TransactionSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        {children}
      </TransactionSearchContext.Provider>
    );
  };
  
  // Custom hook to use Transaction search
  export const useTransactionSearch = () => useContext(TransactionSearchContext);