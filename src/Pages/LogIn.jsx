

import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import AuthContext from "../Authentication With FireBase/AuthContext";
import Swal from "sweetalert2";

const LoginPage = () => {

  
  const userData =use(AuthContext);
  const {LogIn,signInWithGoogle} = userData;

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    LogIn(email, password)
    .then((result) => {
      const user = result.user;
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome to Plant Tracker!',
        confirmButtonColor: '#16a34a'
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
          confirmButtonColor: '#dc2626'
        });
      });
    })
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
          .then((result) => {
            const user = result.user;
            console.log(user);
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Welcome to Plant Tracker!',
              confirmButtonColor: '#16a34a'
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: error.message,
              confirmButtonColor: '#dc2626'
            });
          });
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
