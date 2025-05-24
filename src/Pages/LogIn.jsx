

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const LoginPage = () => {


  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:");
    // Add login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google auth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Log In to Plant Tracker
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              
              name="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-900">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
            
              name="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-full"
          >
            Log In
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full flex items-center gap-2 border border-gray-300 hover:bg-gray-100"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
         <p className="text-sm mt-4 flex justify-center text-gray-700">If you do not have any account <Link to={'/register'} className="mx-1 text-blue-600 font-semibold"> click </Link> here</p>
      </div>
    </div>
  );
};

export default LoginPage;
