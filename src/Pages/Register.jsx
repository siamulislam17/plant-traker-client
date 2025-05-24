
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";


const Register = () => {
  



  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering with:");
    // Add registration logic here
  };

  const handleGoogleRegister = () => {
    console.log("Google registration clicked");
    // Add Google auth logic here
  };

  return (
    <div className="pt-10 min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Register for Plant Tracker
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
