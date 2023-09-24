import {ReactNode, createContext, useState} from "react";

interface User {
  firstName: string;
  lastName: string;
  id: string;
}
// Define a type for your context value
interface UserContextType {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}
export const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({children}:{children:ReactNode}) {
  const [userInfo,setUserInfo] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}