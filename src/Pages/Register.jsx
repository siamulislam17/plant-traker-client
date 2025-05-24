
import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import AuthContext from "../Authentication With FireBase/AuthContext";
import Swal from 'sweetalert2';


const Register = () => {

  const user = use(AuthContext);
  const {createAccount,signInWithGoogle,updateProfileData}=user;
  



  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
    // console.log(name, email, password, photoURL);
   
    createAccount(email, password)
  .then((result) => {
    const user = result.user;
    return updateProfileData(name, photoURL).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: `Welcome ${user.displayName} to Plant Tracker!`,
        confirmButtonColor: '#16a34a'
      });
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

  const handleGoogleRegister = () => {
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
    <div className="pt-10 min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Register for Plant Tracker
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">

          {/* name */}
          <div>
            <label className="block text-sm font-medium text-green-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              required
              placeholder="Enter your name"
              
            />
          </div>


          {/* email */}
          <div>
            <label className="block text-sm font-medium text-green-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              required
              placeholder="Enter your email"
              
            />
          </div>


          {/* photo url */}
          <div>
            <label className="block text-sm font-medium text-green-900">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              className="input input-bordered w-full"
              placeholder="Enter your photo URL"
              
            />
          </div>


          {/* password */}
          <div>
            <label className="block text-sm font-medium text-green-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              required
              placeholder="Enter your password"
               pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
    title="Password must be at least 6 characters and include uppercase and lowercase letters"
              
            />
          </div>
          <button type="submit" className="btn btn-success w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google registration button */}

        <button
          onClick={handleGoogleRegister}
          className="btn w-full flex items-center gap-2 border border-gray-300 hover:bg-gray-100"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-sm mt-4 flex justify-center text-gray-700">If you already have account <Link to={'/login'} className="mx-1 text-blue-600 font-semibold"> click </Link> here</p>
      </div>
    </div>
  );
};

export default Register;
