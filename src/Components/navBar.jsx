// components/Navbar.jsx
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { GiPlantRoots } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {

 
  const { user, logOut, darkMode, setDarkMode } = useContext(AuthContext);
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

        
         <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value={darkMode ? "light" : "dark"}
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode} />

          {/* sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>


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

           <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value={darkMode ? "light" : "dark"}
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode} />

          {/* sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
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
