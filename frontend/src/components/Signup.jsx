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
    const userData = { email: email, password: password };

    axios
      .post("http://localhost:3000/register", userData)
      .then((response) => {
        // Save data locally only if the response is successful
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/"); // Redirect after successful login
      })
      .catch((error) => {
        console.error("Error while Registering in user:", error);
        // Do not save data or navigate on error
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter Name"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button type="button" onClick={collectData}>
        Sign up
      </button>
    </div>
  );
};

export default Signup;
