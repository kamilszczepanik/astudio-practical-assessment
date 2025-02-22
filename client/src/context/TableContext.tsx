import { createContext, useContext, ReactNode, useState } from "react";

interface TableContextType {
  currentPage: number;
  entriesPerPage: number;
  totalItems: number;
  loading: boolean;
  setCurrentPage: (page: number) => void;
  setEntriesPerPage: (entries: number) => void;
  setTotalItems: (total: number) => void;
  setLoading: (loading: boolean) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <TableContext.Provider
      value={{
        currentPage,
        entriesPerPage,
        totalItems,
        loading,
        setCurrentPage,
        setEntriesPerPage,
        setTotalItems,
        setLoading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}; 