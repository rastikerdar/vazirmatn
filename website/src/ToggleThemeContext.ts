import { createContext, useContext } from "react";

export const ToggleThemeContext = createContext<Function | undefined>(
  undefined,
);

export const useToggleTheme = () => {
  const context = useContext(ToggleThemeContext);
  if (context === undefined) {
    throw new Error("useSave must be used within a UserProvider");
  }

  return context;
};
