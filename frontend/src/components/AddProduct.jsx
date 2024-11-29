import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const addProduct = () => {
    const productData = {
      name: name,
      category: category,
      price: price,
      company: company,
      userId: JSON.parse(localStorage.getItem("user"))._id,
    };

    axios
      .post("http://localhost:3000/addproduct", productData)
      .then((response) => {
        navigate("/"); // Redirect after successfully Adding Product
      })
      .catch((error) => {
        console.error("Error while Adding Product:", error);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
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
        type="number"
        name="price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        placeholder="Enter Price"
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        placeholder="Enter Category"
      />
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        placeholder="Enter Company"
      />

      <button type="button" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
