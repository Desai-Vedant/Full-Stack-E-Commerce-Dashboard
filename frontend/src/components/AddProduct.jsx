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
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-700 dark:text-gray-200 mb-6 text-center">
          Add Product
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Product Name"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter Price"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              placeholder="Enter Category"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1"
            >
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              placeholder="Enter Company"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={addProduct}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
