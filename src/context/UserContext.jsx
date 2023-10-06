import { createContext, useState } from "react";
import Cookies from "js-cookie";
// interface User {
//   firstName: string;
//   lastName: string;
//   id: string;
// }
// Define a type for your context value
// interface UserContextType {
//   userInfo: User | null;
//   setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
// }
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(Cookies.get("token"));
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}
