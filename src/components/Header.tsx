import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="flex justify-between items-center mb-12">
      <Link className="font-bold" to="/">
        BLOG
      </Link>
      <nav className="flex gap-5">
        <Link to="/login">Login</Link>
        <Link to="/signup">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
