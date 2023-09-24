import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import toast from "react-hot-toast";
interface User {
  firstName: string;
  lastName: string;
  id: string;
}
const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8000/profile", {
        withCredentials: true,
      });
      console.log("response: " + JSON.stringify(response.data));
      const data = await response.data;
      setUser(data);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/logout", {
        withCredentials: true,
      });
      console.log("res", response);
      if (response.status === 200) {
        setUser(null);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <header className="flex justify-between items-center mb-12">
      <Link className="font-bold" to="/">
        BLOG
      </Link>
      <nav className="flex gap-5">
        {user ? (
          <aside className="flex gap-5">
            <button className="bg-[crimson] text-white px-3 py-1 rounded-md">
              Create post
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" capitalize">{`${user?.firstName} ${user?.lastName}`}</DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </aside>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
