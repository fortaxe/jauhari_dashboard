import  { createContext, useContext, useState, ReactNode } from 'react';

// Create a search context
const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}>({
  searchTerm: '',
  setSearchTerm: () => {},
});

// Create a provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);