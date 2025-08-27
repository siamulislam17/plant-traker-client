// components/Navbar.jsx
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { GiPlantRoots } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../Authentication With FireBase/AuthContext";

const cx = (...c) => c.filter(Boolean).join(" ");

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/plants", label: "All Plants" },
  { to: "/add-plant", label: "Add Plant" },
  { to: "/my-plants", label: "My Plants" },
];

const Navbar = () => {
  const { user, logOut, darkMode, setDarkMode } = useContext(AuthContext) || {};
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Strong emerald bars for both themes
  const barClass = useMemo(
    () =>
      cx(
        "fixed inset-x-0 top-0 z-50 border-b",
        darkMode
          ? "bg-emerald-950 border-emerald-800 text-emerald-100"
          : "bg-emerald-600 border-emerald-700 text-white shadow"
      ),
    [darkMode]
  );

  const linkBase = "text-sm font-medium transition-colors underline-offset-8 hover:underline";
  const linkLight = "text-white/90 hover:text-white";
  const linkDark = "text-emerald-100/90 hover:text-emerald-50";

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Click-away to close
  useEffect(() => {
    const onClick = (e) => {
      if (!isOpen) return;
      const inside = menuRef.current && menuRef.current.contains(e.target);
      const onBtn = btnRef.current && btnRef.current.contains(e.target);
      if (!inside && !onBtn) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logOut?.();
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "You have successfully logged out.",
        confirmButtonColor: "#16a34a",
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: e?.message || "Please try again",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const ThemeToggle = () => (
    <button
      type="button"
      onClick={() => setDarkMode?.(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={cx(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 transition",
        darkMode
          ? "ring-emerald-800 text-emerald-100 hover:bg-emerald-900"
          : "ring-white/40 text-white hover:bg-emerald-700/60"
      )}
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );

  const Avatar = () => {
    const initials =
      user?.displayName
        ? user.displayName
            .split(" ")
            .map((w) => w[0]?.toUpperCase())
            .slice(0, 2)
            .join("")
        : "U";
    return user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="User"
        className="h-9 w-9 rounded-full object-cover ring-2 ring-white/40"
        referrerPolicy="no-referrer"
      />
    ) : (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white text-xs font-semibold ring-2 ring-white/20">
        {initials}
      </span>
    );
  };

  const PrimaryButton = ({ to, children }) => (
    <Link
      to={to}
      className={cx(
        "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        darkMode ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-white text-emerald-700 hover:bg-emerald-50"
      )}
    >
      {children}
    </Link>
  );

  const SecondaryButton = ({ to, children }) => (
    <Link
      to={to}
      className={cx(
        "rounded-lg px-4 py-2 text-sm font-semibold ring-1 transition-colors",
        darkMode
          ? "text-emerald-100 ring-emerald-800 hover:bg-emerald-900"
          : "text-white ring-white/40 hover:bg-emerald-700/60"
      )}
    >
      {children}
    </Link>
  );

  const ActiveAwareLink = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) => cx(linkBase, darkMode ? linkDark : linkLight, isActive && "underline")}
    >
      {label}
    </NavLink>
  );

  return (
    <nav className={barClass} role="navigation" aria-label="Main">
      {/* Relatively positioned bar with fixed height so the dropdown doesn't stretch it */}
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <GiPlantRoots className="text-white" size={22} />
          <span className="text-white leading-none">Plant Tracker</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <ActiveAwareLink key={item.to} to={item.to} label={item.label} />
          ))}

          {/* Actions */}
          <ThemeToggle />

          {user ? (
            <>
              <Avatar />
              <button
                onClick={handleLogout}
                className={cx(
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                  darkMode
                    ? "text-emerald-100 ring-1 ring-emerald-800 hover:bg-emerald-900"
                    : "text-white ring-1 ring-white/40 hover:bg-emerald-700/60"
                )}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <SecondaryButton to="/login">Log In</SecondaryButton>
              <PrimaryButton to="/register">Sign Up</PrimaryButton>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {user && <Avatar />}
          <button
            ref={btnRef}
            onClick={() => setIsOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className={cx(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 transition",
              darkMode ? "ring-emerald-800 text-emerald-100 hover:bg-emerald-900" : "ring-white/40 text-white hover:bg-emerald-700/60"
            )}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu: ABSOLUTE under the bar; doesn't affect nav height */}
        <div
          ref={menuRef}
          className={cx(
            "md:hidden absolute left-0 right-0 top-full origin-top rounded-b-xl transition-[opacity,transform,visibility]",
            isOpen ? "visible opacity-100 scale-y-100" : "invisible opacity-0 scale-y-95",
            darkMode ? "bg-emerald-950 text-emerald-100" : "bg-emerald-50 text-emerald-900",
            "shadow-lg"
          )}
        >
          <div
            className={cx(
              "mx-3 my-2 max-h-[70vh] overflow-y-auto rounded-lg border",
              darkMode ? "border-emerald-800" : "border-emerald-200"
            )}
          >
            <div className="flex flex-col gap-1 px-3 py-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      "block rounded-md px-2 py-1 text-sm",
                      isActive
                        ? darkMode
                          ? "bg-emerald-800 text-white"
                          : "bg-emerald-200 text-emerald-900"
                        : darkMode
                          ? "hover:bg-emerald-900/60"
                          : "hover:bg-emerald-100"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className={cx("mx-3 h-px", darkMode ? "bg-emerald-800" : "bg-emerald-200")} />

            <div className="flex flex-col gap-2 px-3 py-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className={cx(
                    "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    darkMode ? "bg-emerald-700 text-white hover:bg-emerald-600" : "bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={cx(
                      "rounded-lg px-3 py-1.5 text-center text-sm font-medium transition-colors",
                      darkMode ? "bg-emerald-700 text-white hover:bg-emerald-600" : "bg-emerald-600 text-white hover:bg-emerald-700"
                    )}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className={cx(
                      "rounded-lg px-3 py-1.5 text-center text-sm font-medium transition-colors",
                      darkMode
                        ? "bg-white text-emerald-800 hover:bg-emerald-50"
                        : "bg-white text-emerald-700 border border-emerald-600 hover:bg-emerald-50"
                    )}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
