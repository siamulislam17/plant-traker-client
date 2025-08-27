
import React, { useContext, useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../Authentication With FireBase/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// tiny helper
const cx = (...c) => c.filter(Boolean).join(" ");

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { darkMode, LogIn, signInWithGoogle } = useContext(AuthContext) || {
    darkMode: false,
  };

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  // theme atoms (no DaisyUI)
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
    "w-full rounded-lg border shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 p-1.5 text-sm";
  const inputLight = "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-500";
  const inputDark = "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-400";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!LogIn) return;
    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await LogIn(email, password);
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome${result?.user?.displayName ? `, ${result.user.displayName}` : ""}!`,
        confirmButtonColor: "#16a34a",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.message || "Please try again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!signInWithGoogle) return;
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome${result?.user?.displayName ? `, ${result.user.displayName}` : ""}!`,
        confirmButtonColor: "#16a34a",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.message || "Please try again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("min-h-screen flex items-center justify-center px-4 pt-20", containerBg)}>
      <div className={cardClass}>
        <h2 className={cx("text-2xl font-extrabold text-center", darkMode ? "text-emerald-400" : "text-green-700")}>
          Log In to Plant Tracker
        </h2>
        <p className={cx("mt-2 mb-6 text-center text-sm", helpText)}>
          Welcome back. Let’s get you to your plants.
        </p>

        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          {/* Email */}
          <label className="block">
            <span className={cx("mb-1.5 block text-sm font-medium", labelText)}>Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={cx(inputBase, darkMode ? inputDark : inputLight)}
            />
          </label>

          {/* Password */}
          <label className="block">
            <span className={cx("mb-1.5 block text-sm font-medium", labelText)}>Password</span>
            <div className="relative">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                required
                placeholder="Enter your password"
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
            <div className="mt-1 flex justify-between">
              <div className={cx("text-xs", helpText)}>
                Use at least 6 characters. Keep it secret, keep it safe.
              </div>
              
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className={cx("my-6 flex items-center gap-4", helpText)}>
          <div className="h-px flex-1 bg-current/30" />
          <span className="text-xs uppercase">or</span>
          <div className="h-px flex-1 bg-current/30" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className={cx(
            "w-full rounded-xl border px-4 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2",
            "hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed",
            darkMode ? "border-zinc-700 text-zinc-100 bg-zinc-900 hover:bg-zinc-800" : "border-zinc-300 text-zinc-800 bg-white hover:bg-zinc-50"
          )}
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className={cx("mt-4 text-center text-sm", helpText)}>
          Don’t have an account?{" "}
          <Link to="/register" className={cx("font-semibold", darkMode ? "text-emerald-400" : "text-emerald-700")}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
