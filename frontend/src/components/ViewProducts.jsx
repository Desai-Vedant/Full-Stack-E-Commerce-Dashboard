import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductTile from "./ProductTile";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const deleteProduct = (productId) => {
    axios
      .post("http://localhost:3000/deleteproduct", { productId })
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error while deleting Product:", error);
      });
  };

  const navigateUpdate = (productId) => {
    //console.log(productId);
    navigate(`/update/${productId}`);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData._id;
    axios
      .post("http://localhost:3000/products", { userId: userId })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Products :", error);
      });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <ProductTile
          product={product}
          key={product._id}
          onDelete={() => {
            deleteProduct(product._id);
          }}
          onUpdate={() => {
            navigateUpdate(product._id);
          }}
        ></ProductTile>
      ))}
    </div>
  );
};

export default Products;
