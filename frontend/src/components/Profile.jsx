import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user data found in local storage.");
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      if (!userData || !userData._id) {
        setError("Invalid user data.");
        return;
      }

      // Fetch profile data
      axios
        .post("http://localhost:3000/getprofile", { userId: userData._id })
        .then((response) => {
          setUserName(response.data.name);
          setUserEmail(response.data.email);
        })
        .catch((error) => {
          setError("Error while getting user data.");
          console.error(error);
        });
    } catch (e) {
      setError("Failed to parse user data.");
    }
  }, []); // Empty dependency array ensures this runs only once.

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="bg-gray-300 p-4 rounded-t-lg dark:bg-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center">
            Profile
          </h2>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Name:
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{userName}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Email:
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
