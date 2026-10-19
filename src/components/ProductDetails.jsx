function ProductDetails({
  product,
  onAddToCart,
  isCartPending,
  forceFailure,
  onForceFailureChange,
  cartError,
  cartSuccess
}) {
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

        <button
          type="button"
          className="product-action-button"
          onClick={() => onAddToCart(product)}
          disabled={isCartPending}
        >
          {isCartPending ? "Adding..." : "Add to Cart"}
        </button>

        <label className="failure-toggle">
          <input
            type="checkbox"
            checked={forceFailure}
            onChange={(event) => onForceFailureChange(event.target.checked)}
            disabled={isCartPending}
          />
          <span>Simulate API failure (next add)</span>
        </label>

        {cartError ? <p className="cart-error-message">{cartError}</p> : null}
        {cartSuccess ? <p className="cart-success-message">{cartSuccess}</p> : null}
      </div>
    </article>
  );
}

export default ProductDetails;
