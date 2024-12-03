import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
          setProfilePicture(response.data.profilePicture); // Load profile picture
        })
        .catch((error) => {
          setError("Error while getting user data.");
          console.error(error);
        });
    } catch (e) {
      setError("Failed to parse user data.");
    }
  }, []); // Empty dependency array ensures this runs only once.

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg",
      "image/jpg",
    ];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please select an image file.");
      e.target.value = ""; // Clear input
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // Limit to 5MB
      alert("File size must be less than 5MB.");
      e.target.value = ""; // Clear input
      return;
    }

    setSelectedFile(file); // Update state
  };

  const handleUpload = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user data found in local storage.");
      return;
    }

    const userData = JSON.parse(storedUser);

    const formData = new FormData();
    if (!selectedFile) {
      alert("Please Select a Image.");
    } else {
      formData.append("profilePic", selectedFile);
      formData.append("userId", userData._id);
      try {
        const response = await axios.post(
          "http://localhost:3000/upload-profile-picture",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setProfilePicture(response.data.profilePicture); // Update profile picture
        setShowModal(false); // Close modal after upload
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setError("Failed to upload profile picture.");
      }
    }
  };

  const handleDelete = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user data found in local storage.");
      return;
    }

    const userData = JSON.parse(storedUser);

    try {
      const response = await axios.post(
        "http://localhost:3000/delete-profile-picture",
        {
          userId: userData._id,
        }
      );

      setProfilePicture(`/uploads/profile.png`); // Remove profile picture
      setShowModal(false); // Close modal after delete
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      setError("Failed to delete profile picture.");
    }
  };

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
          <div className="text-center">
            <img
              src={`http://localhost:3000${profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>

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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Update Profile Picture
            </h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-gray-500 dark:text-gray-400 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
