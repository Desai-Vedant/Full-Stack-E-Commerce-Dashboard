import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${productId}`)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setCompany(response.data.company);
      })
      .catch((error) => {
        console.error("Error fetching Product data :", error);
      });
  }, [productId]);

  const updateProductDetails = () => {
    const productData = {
      _id: productId,
      name: name,
      category: category,
      price: price,
      company: company,
      userId: JSON.parse(localStorage.getItem("user"))._id,
    };

    axios
      .post("http://localhost:3000/updateproduct", productData)
      .then((response) => {
        navigate("/"); // Redirect after successfully Updating Product
      })
      .catch((error) => {
        console.error("Error while Updating Product:", error);
      });
  };

  return (
    <div>
      <h1>Update Product</h1>
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

      <button type="button" onClick={updateProductDetails}>
        Update Product Details
      </button>
    </div>
  );
};

export default UpdateProduct;
