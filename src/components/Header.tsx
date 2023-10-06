import { useEffect, useState } from "react";
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
import { Menu, PenSquare, Power } from "lucide-react";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<undefined | string>(undefined);
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    Cookies.remove("token");
    navigate("/login");
  };

  useEffect(() => {
    (() => {
      setToken(Cookies.get("token"));
    })();
  }, [token]);

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
                {/* {userInfo?.firstName && userInfo?.lastName && (
                  <DropdownMenuItem className=" capitalize">{`${userInfo?.firstName} ${userInfo?.lastName}`}</DropdownMenuItem>
                )} */}
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

        <Sheet>
          <SheetTrigger onClick={() => setOpen(true)}>
          <Menu />
          </SheetTrigger>
          {open && (
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          )}
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
