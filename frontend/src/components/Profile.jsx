import React from "react";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData.name;
  const userEmail = userData.email;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Profile
        </h2>
        <div className="space-y-4">
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
