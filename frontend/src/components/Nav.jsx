import React from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.clear();

      // Call the backend logout endpoint to clear cookies
      await apiClient.post("/api/users/logout", {}, { withCredentials: true });

      // Redirect user
      navigate("/signup");
    } catch (error) {
      alert(`Error while Logging out : ${error.response.data.message}`);
    }
  };

  return (
    <div className="top-0 left-0 w-full bg-gray-100 dark:bg-gray-800 p-4 shadow-lg z-50">
      <nav className="flex items-center justify-between">
        {/* Left Section: Shopping Icon */}
        <div className="flex items-center">
          <img src="shopping.svg" alt="Shopping" className="w-8 h-8 mr-4" />
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 text-xl font-bold hover:text-green-500 transition duration-200 ease-in-out"
          >
            Product Dashboard
          </Link>
        </div>

        {/* Right Section: Links */}
        <ul className="flex space-x-6 text-gray-700 dark:text-gray-200">
          {auth ? (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-500 transition duration-200 ease-in-out"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/add"
                  className="hover:text-blue-500 transition duration-200 ease-in-out"
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-blue-500 transition duration-200 ease-in-out"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={logout}
                  className="hover:text-red-500 transition duration-200 ease-in-out"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-500 transition duration-200 ease-in-out"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-green-500 transition duration-200 ease-in-out"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
