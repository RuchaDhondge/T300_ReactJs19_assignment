import { use } from "react";

function ProductList({ productsPromise, onSelectProduct, selectedProductId }) {
  const products = use(productsPromise);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article
          key={product.id}
          className={`product-card ${selectedProductId === product.id ? "selected" : ""}`}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-content">
            <h3>{product.name}</h3>
            <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <button
              type="button"
              className="product-action-button"
              onClick={() => onSelectProduct(product)}
            >
              View details
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProductList;
