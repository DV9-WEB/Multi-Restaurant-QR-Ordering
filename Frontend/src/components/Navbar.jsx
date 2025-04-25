import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
     const confirmLogout = window.confirm("Are you sure you want to logout?");
     if (confirmLogout) {
       dispatch(logout());
     }
  };


  return (
    <nav className="bg-base-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          🍽️ MyRestaurant
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
          {user ? (
            <>
              <span className="btn btn-ghost  text-white">
                Hi, {user.name || "User"}
              </span>
              <Link to="/dashboard" className="btn btn-ghost">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-ghost">
                Signup
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="btn btn-ghost text-xl">
            ☰
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`transition-all duration-300 overflow-hidden md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-3 p-4">
          <Link to="/" className="btn btn-sm btn-outline w-full">
            Home
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="btn btn-sm btn-outline w-full">
                Login
              </Link>
              <Link to="/signup" className="btn btn-sm btn-outline w-full">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="btn btn-sm btn-outline w-full">
                Hi, {user.name || "User"}
              </span>
              <Link to="/dashboard" className="btn btn-sm btn-outline w-full">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline w-full"
              >
                Logout
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
