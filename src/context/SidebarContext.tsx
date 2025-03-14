import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for context
type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

// Create context with proper typing
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// SidebarProvider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the SidebarContext
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
