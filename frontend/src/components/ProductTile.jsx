import React from "react";

const ProductTile = ({ product, onDelete, onUpdate }) => {
  return (
    <div className="p-6 m-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col space-y-4">
      <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {product.name}
      </h4>
      <div className="space-y-2">
        <p className="text-gray-700 dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Price:
          </span>{" "}
          {product.price}
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Category:
          </span>{" "}
          {product.category}
        </p>
        <p className="text-gray-700 dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Company:
          </span>{" "}
          {product.company}
        </p>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={onDelete}
          className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
        <button
          onClick={onUpdate}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ProductTile;
