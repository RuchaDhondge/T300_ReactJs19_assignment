import { Suspense, useOptimistic, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import RegistrationForm from "./components/RegistrationForm";
import RegisteredUserInfo from "./components/RegisteredUserInfo";
import UserContext from "./context/UserContext";
import { productsPromise } from "./data/products";

function LoadingProducts() {
  return <p className="state-message">Loading products...</p>;
}

function addToCartRequest(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Unable to add item to cart. Please try again."));
        return;
      }

      resolve();
    }, 2000);
  });
}

function App() {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [forceFailure, setForceFailure] = useState(false);
  const [isCartPending, setIsCartPending] = useState(false);
  const [cartError, setCartError] = useState("");
  const [cartSuccess, setCartSuccess] = useState("");
  const [optimisticCartCount, addOptimisticCart] = useOptimistic(
    cartCount,
    (currentCount, increaseBy) => currentCount + increaseBy
  );

  async function handleAddToCart(product) {
    setCartError("");
    setCartSuccess("");
    setIsCartPending(true);
    addOptimisticCart(1);

    try {
      await addToCartRequest(forceFailure);
      setCartCount((currentCount) => currentCount + 1);
      setCartSuccess(`${product.name} added to cart.`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to add item to cart. Please try again.";
      setCartError(message);
    } finally {
      setForceFailure(false);
      setIsCartPending(false);
    }
  }

  return (
    <>
      <title>Mini E-Commerce Store - Products</title>
      <meta
        name="description"
        content="Browse products and register to continue with the mini e-commerce experience."
      />

      <UserContext value={registeredUser}>
        <main className="app-shell">
          <header className="app-header">
            <h1>Mini E-Commerce Store</h1>
            <div className="cart-summary-wrap">
              <p className="cart-count">Cart: {optimisticCartCount}</p>
              {isCartPending ? <span className="cart-pending">Updating...</span> : null}
            </div>
          </header>

          <section className="layout-grid">
            <section className="panel">
              <h2>Product Listing</h2>
              <ErrorBoundary>
                <Suspense fallback={<LoadingProducts />}>
                  <ProductList
                    productsPromise={productsPromise}
                    onSelectProduct={setSelectedProduct}
                    selectedProductId={selectedProduct?.id}
                  />
                </Suspense>
              </ErrorBoundary>
            </section>

            <section className="panel">
              <h2>Product Details</h2>
              <ProductDetails
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                isCartPending={isCartPending}
                forceFailure={forceFailure}
                onForceFailureChange={setForceFailure}
                cartError={cartError}
                cartSuccess={cartSuccess}
              />
            </section>

            <section className="panel">
              <h2>User Registration</h2>
              <RegistrationForm onRegisterSuccess={setRegisteredUser} />
            </section>

            <section className="panel">
              <RegisteredUserInfo />
            </section>
          </section>
        </main>
      </UserContext>
    </>
  );
}

export default App;
