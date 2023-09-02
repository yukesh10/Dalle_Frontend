import { createContext, useState } from "react";
import { User } from "../models/User";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [ user, setUser ] = useState(User);

  const contextValue = {user, setUser};

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider};