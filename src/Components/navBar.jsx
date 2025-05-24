// components/Navbar.jsx
import { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { GiPlantRoots } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";

const Navbar = () => {


  const handleLogout = () => {
    console.log('logout');
  }

  const userData = use(AuthContext);
  const {user} = userData;
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [

    <NavLink to="/" className={`hover:text-green-700  { isActive ? 'active' : '' } `}>Home</NavLink>,
    <NavLink to="/plants" className={`hover:text-green-700  { isActive ? 'active' : '' } `}>All Plants</NavLink>,
    <NavLink to="/add-plant" className={`hover:text-green-700  { isActive ? 'active' : '' } `}>Add Plant</NavLink>,
    <NavLink to="/my-plants" className={`hover:text-green-700  { isActive ? 'active' : '' } `}>My Plants</NavLink>,
    
  ];

  return (
    <nav className=" bg-green-100 text-green-900 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <GiPlantRoots className="text-green-700 text-3xl" />
          Plant Tracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems}
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
          
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
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
          {navItems.map((item) => (
            <p
              
              className="text-lg border-b border-green-200 pb-1 hover:font-semibold"
            >
              {item}
            </p>
            
          ))}
        {
  user ? (
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
  )
}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
