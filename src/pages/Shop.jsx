import { useGetAllProductsQuery } from "../features/api/apiSlice";
import ProductCard from "../components/ProductCard";

function Shop() {
  const { data: products } = useGetAllProductsQuery();
  console.log(products);
  return (
    <>
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
          {products?.length > 0 ? (
            <div className="section__content">
              <div className="grid three">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="section__content">
              <div className="grid three">
                <h2>No products found OoO.</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Shop;
