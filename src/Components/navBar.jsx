// components/Navbar.jsx
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { GiPlantRoots } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import Swal from "sweetalert2";
import AuthContext from "../Authentication With FireBase/AuthContext";

// tiny helper
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

  // Bar background + border vary by theme
  const barClass = useMemo(
    () =>
      cx(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur",
        darkMode
          ? // DARK: deeper bg and higher contrast text/border
            "bg-zinc-900/80 border-zinc-700"
          : // LIGHT
            "bg-white/70 border-zinc-200 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
      ),
    [darkMode]
  );

  const linkBase =
    "text-sm font-medium transition-colors underline-offset-8 hover:underline";
  const linkLight = "text-zinc-700 hover:text-emerald-700";
  const linkDark = "text-zinc-200 hover:text-emerald-400";

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      const insidePanel = menuRef.current && menuRef.current.contains(e.target);
      const onButton = btnRef.current && btnRef.current.contains(e.target);
      if (!insidePanel && !onButton) setIsOpen(false);
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
          ? "ring-zinc-700 text-zinc-200 hover:bg-zinc-800"
          : "ring-zinc-300 text-zinc-700 hover:bg-zinc-100"
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
        className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500/40"
        referrerPolicy="no-referrer"
      />
    ) : (
      <span
        className={cx(
          "inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold",
          darkMode ? "bg-zinc-800 text-zinc-200" : "bg-emerald-100 text-emerald-700"
        )}
      >
        {initials}
      </span>
    );
  };

  const PrimaryButton = ({ to, children }) => (
    <Link
      to={to}
      className={cx(
        "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
        darkMode
          ? "bg-emerald-500 text-white hover:bg-emerald-600"
          : "bg-emerald-600 text-white hover:bg-emerald-700"
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
          ? "text-zinc-100 ring-zinc-700 hover:bg-zinc-800"
          : "text-zinc-800 ring-zinc-300 hover:bg-zinc-100"
      )}
    >
      {children}
    </Link>
  );

  const ActiveAwareLink = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          linkBase,
          darkMode ? linkDark : linkLight,
          isActive && (darkMode ? "text-emerald-400 underline" : "text-emerald-700 underline")
        )
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className={barClass} role="navigation" aria-label="Main">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <GiPlantRoots className={darkMode ? "text-emerald-400" : "text-emerald-600"} size={28} />
          <span className={darkMode ? "text-zinc-100" : "text-zinc-900"}>Plant Tracker</span>
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
                    ? "text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-800"
                    : "text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-100"
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
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          {user && <Avatar />}
          <button
            ref={btnRef}
            onClick={() => setIsOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className={cx(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 transition",
              darkMode
                ? "ring-zinc-700 text-zinc-200 hover:bg-zinc-800"
                : "ring-zinc-300 text-zinc-700 hover:bg-zinc-100"
            )}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={cx(
          "md:hidden origin-top overflow-hidden transition-all",
          isOpen ? "pointer-events-auto scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0",
          darkMode ? "bg-zinc-900 text-zinc-200" : "bg-white text-zinc-800"
        )}
      >
        <div
          className={cx(
            "mx-4 mb-4 rounded-xl border p-4",
            darkMode ? "border-zinc-700" : "border-zinc-200"
          )}
        >
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <ActiveAwareLink key={item.to} to={item.to} label={item.label} />
            ))}
          </div>

          {/* Divider */}
          <div className={cx("my-3 h-px", darkMode ? "bg-zinc-700" : "bg-zinc-200")} />

          <div className="flex items-center justify-between">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar />
                  <div className={cx("text-sm", darkMode ? "text-zinc-300" : "text-zinc-700")}>
                    {user.displayName || user.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className={cx(
                    "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    darkMode
                      ? "text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-800"
                      : "text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-100"
                  )}
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex w-full items-center justify-between gap-2">
                <Link
                  to="/login"
                  className={cx(
                    "flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold ring-1 transition-colors",
                    darkMode
                      ? "text-zinc-100 ring-zinc-700 hover:bg-zinc-800"
                      : "text-zinc-800 ring-zinc-300 hover:bg-zinc-100"
                  )}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className={cx(
                    "flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold transition-colors",
                    darkMode
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Safe-area spacer */}
        <div className="h-2" />
      </div>
    </nav>
  );
};

export default Navbar;
