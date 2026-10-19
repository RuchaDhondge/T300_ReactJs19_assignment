function ProductDetails({ product }) {
  if (!product) {
    return (
      <p className="state-message">
        Select a product from the listing to view full details.
      </p>
    );
  }

  return (
    <article className="product-details-card">
      <img src={product.image} alt={product.name} className="product-details-image" />
      <div className="product-details-content">
        <h3>{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString("en-IN")}</p>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </article>
  );
}

export default ProductDetails;
