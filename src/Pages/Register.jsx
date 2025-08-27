// Register.jsx — React (JavaScript)
import React, { useContext, useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../Authentication With FireBase/AuthContext";
import Swal from "sweetalert2";
import { EyeClosed, EyeClosedIcon } from "lucide-react";
import { RxEyeOpen } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// tiny helper
const cx = (...c) => c.filter(Boolean).join(" ");

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createAccount, signInWithGoogle, updateProfileData, darkMode } =
    useContext(AuthContext) || {};

  // UI state
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // Colors per theme (no DaisyUI component tokens)
  const containerBg = useMemo(() => (darkMode ? "bg-zinc-950" : "bg-gray-100"), [darkMode]);
  const cardClass = useMemo(
    () =>
      darkMode
        ? "w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-xl backdrop-blur"
        : "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg",
    [darkMode]
  );
  const labelText = darkMode ? "text-zinc-200" : "text-zinc-700";
  const helpText = darkMode ? "text-zinc-400" : "text-zinc-500";
  const inputBase =
    "w-full rounded-lg p-1.5 border shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500";
  const inputLight = "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500";
  const inputDark = "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400";

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!createAccount || !updateProfileData) return;

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoURL = form.photoURL.value.trim();

    try {
      setLoading(true);
      const result = await createAccount(email, password);
      const user = result.user;
      await updateProfileData(name, photoURL);
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome ${user?.displayName || name} to Plant Tracker!`,
        confirmButtonColor: "#16a34a",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.message || "Please try again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (!signInWithGoogle) return;
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome${user?.displayName ? `, ${user.displayName}` : ""}!`,
        confirmButtonColor: "#16a34a",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.message || "Please try again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("min-h-screen pb-20 pt-20 flex items-center justify-center px-4", containerBg)}>
      <div className={cardClass}>
        <h2 className={cx("text-2xl font-extrabold text-center", darkMode ? "text-emerald-400" : "text-green-700")}> 
          Register for Plant Tracker
        </h2>
        <p className={cx("mt-2 mb-6 text-center text-sm", helpText)}>
          Create your account. Your data stays private.
        </p>

        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          {/* Name */}
          <label className="block">
            <span className={cx("mb-1.5 block text-sm font-medium", labelText)}>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className={cx(inputBase, darkMode ? inputDark : inputLight)}
            />
          </label>

          {/* Email */}
          <label className="block">
            <span className={cx("mb-1.5 block text-sm font-medium", labelText)}>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
              className={cx(inputBase, darkMode ? inputDark : inputLight)}
            />
          </label>

          {/* Photo URL */}
          <label className="block">
            <span className={cx("mb-1.5 block text-sm font-medium", labelText)}>Photo URL</span>
            <input
              type="url"
              name="photoURL"
              placeholder="https://..."
              className={cx(inputBase, darkMode ? inputDark : inputLight)}
            />
          </label>

          {/* Password */}
          <label className="block">
            <span className={cx("mb-1.5 block text-sm font-medium", labelText)}>Password</span>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Password must be at least 6 characters and include uppercase and lowercase letters"
                className={cx(inputBase, darkMode ? inputDark : inputLight, "pr-10")}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className={cx(
                  "absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-xs",
                  darkMode ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-100"
                )}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
               {showPwd ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={cx(
              "w-full rounded-lg p-1.5 text-white font-semibold tracking-wide transition-transform",
              "hover:scale-[1.01] active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed",
              darkMode ? "bg-emerald-500 hover:bg-emerald-600" : "bg-emerald-600 hover:bg-emerald-700"
            )}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className={cx("my-6 flex items-center gap-4", helpText)}>
          <div className="h-px flex-1 bg-current/30" />
          <span className="text-xs uppercase">or</span>
          <div className="h-px flex-1 bg-current/30" />
        </div>

        {/* Google registration */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className={cx(
            "w-full rounded-lg p-1.5 border px-4 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2",
            "hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed",
            darkMode ? "border-zinc-700 text-zinc-100 bg-zinc-900 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 bg-white hover:bg-zinc-50"
          )}
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className={cx("mt-4 text-center text-sm", helpText)}>
          Already have an account?{" "}
          <Link to="/login" className={cx("font-semibold", darkMode ? "text-emerald-400" : "text-emerald-700")}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
