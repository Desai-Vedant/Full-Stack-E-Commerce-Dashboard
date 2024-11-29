import React from "react";
import { useNavigate } from "react-router";

const ProductTile = ({ product, onDelete, onUpdate }) => {
  return (
    <div>
      <h4>{product.name}</h4>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>{product.company}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
};

export default ProductTile;
