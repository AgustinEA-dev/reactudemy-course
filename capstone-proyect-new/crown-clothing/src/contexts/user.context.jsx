import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener  } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUSer: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUSer] = useState(null);
  const value = { currentUser, setCurrentUSer };

  useEffect(() => {}, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
