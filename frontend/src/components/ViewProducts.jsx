import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTile from "./ProductTile";
import apiClient from "../apiClient";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const deleteProduct = (productId) => {
    apiClient
      .post("/api/products/delete-product", { productId })
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        alert(`Error while deleting Product: ${error.response.data.message}`);
      });
  };

  const navigateUpdate = (productId) => {
    navigate(`/update/${productId}`);
  };

  useEffect(() => {
    apiClient
      .post("/api/products/get-products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert(`Error fetching Products : ${error.response.data.message}`);
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
