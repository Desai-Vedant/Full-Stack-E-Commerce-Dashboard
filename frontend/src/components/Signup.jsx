import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = () => {
    if (name != "" && email != "" && password != "") {
      const userData = { name: name, email: email, password: password };

      axios
        .post("http://localhost:3000/api/users/register", userData, {
          withCredentials: true,
        })
        .then((response) => {
          // Save data locally only if the response is successful
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/"); // Redirect after successful login
        })
        .catch((error) => {
          // Do not save data or navigate on error
          alert(`${error.response.data.message}`);
        });
    } else {
      alert("All the fields are required !");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-700 dark:text-gray-200 mb-6 text-center">
          Register
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required={true}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Name"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required={true}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required={true}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Create a Password"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={collectData}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
