import { Link } from "react-router";
import { FaLeaf } from "react-icons/fa";

const errorPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4">
      <div className="text-9xl text-green-300 font-bold mb-4 animate-bounce ">404</div>
      <FaLeaf className="text-green-500 text-5xl mb-2" />
      <h1 className="text-3xl font-semibold text-green-700 mb-2">
        Oops! Lost in the Jungle 🌿
      </h1>
      <p className="text-green-900 mb-6">
        The plant you're looking for doesn't seem to be here. Maybe it grew legs and walked away.
      </p>
      <Link to="/" className="btn btn-success">
        Go Back Home
      </Link>
    </div>
  );
};

export default errorPage;
