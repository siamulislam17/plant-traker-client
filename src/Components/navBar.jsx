// components/Navbar.jsx
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { GiPlantRoots } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful',
      text: 'You have successfully logged out.',
      confirmButtonColor: '#16a34a',
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/plants", label: "All Plants" },
    { to: "/add-plant", label: "Add Plant" },
    { to: "/my-plants", label: "My Plants" },
  ];
  const navLinks = <>

    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `hover:text-green-700 ${isActive ? "font-semibold underline" : ""}`
        }
      >
        {item.label}
      </NavLink>
    ))}
    
    </>

  return (

    
    <nav className="bg-green-100 text-green-900 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <GiPlantRoots className="text-green-700 text-3xl" />
          Plant Tracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `hover:text-green-700 ${isActive ? "font-semibold underline" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
         {/* User Profile */}
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-green-700 object-cover"
            />
          )}

          {/* Login and Sign Up Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn text-white border bg-green-800 hover:bg-green-200 rounded px-4 py-2 font-semibold"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn bg-green-600 text-white hover:bg-green-700 rounded px-4 py-2 font-semibold"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn bg-green-100 text-green-800 border border-green-500 hover:bg-green-200 rounded px-4 py-2 font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}


          
        </div>

        {/* Mobile Menu Icon */}
       
         <div className="md:hidden flex items-center gap-4">
          {/* User Profile */}
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-green-700 object-cover"
            />
          )}
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
        
        
       </div>
        

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-50 px-4 pb-4 flex flex-col gap-4">
          {navLinks }
          

          {user ? (
            <button
              onClick={handleLogout}
              className="btn bg-green-100 text-green-800 border border-green-500 hover:bg-green-200 rounded px-4 py-2 font-semibold"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn bg-green-600 text-white hover:bg-green-700 rounded px-4 py-2 font-semibold"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn bg-green-100 text-green-800 border border-green-500 hover:bg-green-200 rounded px-4 py-2 font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
         
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;
