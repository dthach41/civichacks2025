import { Link, useLocation } from "react-router";


export default function NavBar() {
  const location = useLocation(); // Get the current location (path)

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="top-0 flex w-full bg-blue-700 h-14 items-center">
      <div className="mr-auto flex ml-6">
        <Link
          to="/landing"
          className="text-gray-200 mx-1 p-1 text-2xl font-bold hover:text-gray-400 "
        >
          Logo
        </Link>
      </div>
      <div className="ml-auto flex space-x-6 mr-6">
        <Link
          to="/"
          className={`text-gray-200 mx-1 p-1 hover:text-gray-400 cursor-pointer ${
            isActive("/") ? "active-link" : ""
          }`}
        >
          Home
        </Link>

        <Link
          to="/jobs"
          className={`text-gray-200 mx-1 p-1 hover:text-gray-400 cursor-pointer ${
            isActive("/jobs") ? "active-link" : ""
          }`}
        >
          Jobs
        </Link>

        <Link
          to="/analyzer"
          className={`text-gray-200 mx-1 p-1 hover:text-gray-400 cursor-pointer ${
            isActive("/analyzer") ? "active-link" : ""
          }`}
        >
          Analyzer
        </Link>

        <Link
          to="/profile"
          className={`text-gray-200 mx-1 p-1 hover:text-gray-400 cursor-pointer ${
            isActive("/profile") ? "active-link" : ""
          }`}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
