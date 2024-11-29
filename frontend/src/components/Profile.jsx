import React from "react";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData.name;
  const userEmail = userData.email;

  return (
    <div>
      <h4>{userName}</h4>
      <p>{userEmail}</p>
    </div>
  );
};

export default Profile;
