import React from "react";
import { addToCart } from "../features/cartSlice";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product__card"
    >
      <div className="ingredient__img">
        <figure>
          {product.image ? (
            <img src={product.image} alt={product.title} />
          ) : null}
        </figure>
      </div>
      <div className="ingredient__title">
        <h3>{product.title}</h3>
      </div>
      <div className="ingredient__description">
        <p>{product.category}</p>
        <p>
          <span className="price">${product.price}</span>
        </p>
      </div>
      <div className="ingredient__btn">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
          className="btn btn-primary"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
