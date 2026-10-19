import { use } from "react";

function ProductList({ productsPromise }) {
  const products = use(productsPromise);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-content">
            <h3>{product.name}</h3>
            <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProductList;
