import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { PenSquare, Power } from "lucide-react";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:8000/profile", {
        withCredentials: true,
      });
      const data = await response.data;

      setUserInfo(data);
      setToken(Cookies.get("token"));
    })();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo(null);
        Cookies.remove("token");
        navigate("/login");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <header className="flex justify-between items-center mb-12">
      <Link className="font-bold" to="/">
        <img src={Logo} alt="" width={70} height={40} />
      </Link>
      <nav className="flex gap-5">
        {token ? (
          <aside className="flex gap-5 items-center justify-center">
            <Link
              to="/create"
              className="px-3 py-2 rounded-md flex gap-2"
              title="Create new post"
            >
              <PenSquare />
              Create post
            </Link>
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
                {userInfo.firstName && userInfo.lastName && (
                  <DropdownMenuItem className=" capitalize">{`${userInfo?.firstName} ${userInfo?.lastName}`}</DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="cursor-pointer flex gap-2"
                  onClick={handleLogout}
                >
                  <Power className="w-5 h-5" />
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
