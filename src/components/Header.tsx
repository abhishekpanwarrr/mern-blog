import axios from "axios";
import { useContext, useEffect } from "react";
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
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8000/profile", {
        withCredentials: true,
      });
      const data = await response.data;
      setUserInfo(data);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo(null);
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
        {userInfo ? (
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
                <DropdownMenuItem className=" capitalize">{`${userInfo?.firstName} ${userInfo?.lastName}`}</DropdownMenuItem>
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
