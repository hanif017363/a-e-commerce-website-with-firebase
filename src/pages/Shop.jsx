import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(filteredData);
    };
    getProducts();
  }, []);

  return (
    <div>
      <div className="page-banner">
        <div className="page-banner__details">
          <div className="page-banner__details__title">
            <h1>Our E-commerce Website</h1>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="section__head">
            <div className="product__details__title">
              <h2>All Products</h2>
            </div>
          </div>
          {products.length > 0 && (
            <div className="section__content">
              <div className="grid three">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
