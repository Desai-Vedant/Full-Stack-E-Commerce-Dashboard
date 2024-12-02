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
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
          Update Product
        </h1>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Name"
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={updateProductDetails}
          className="w-full mt-6 p-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Update Product Details
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
