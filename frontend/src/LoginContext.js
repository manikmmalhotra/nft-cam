import React, { useState } from "react";
export const UserContext = React.createContext("");
const LoginContext = ({ subPages }) => {
  const [user, setUser] = useState("");
  const [userInputURL, setUserInputURL] = useState("");
  return (
    <UserContext.Provider value={[user, setUser, userInputURL, setUserInputURL]}>
      {subPages}
    </UserContext.Provider>
  );
};
export default LoginContext;
