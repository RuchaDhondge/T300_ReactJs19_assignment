import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ProductList from "./components/ProductList";
import { productsPromise } from "./data/products";

function LoadingProducts() {
  return <p className="state-message">Loading products...</p>;
}

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Mini E-Commerce Store</h1>
      </header>

      <section className="layout-grid">
        <section className="panel">
          <h2>Product Listing</h2>
          <ErrorBoundary>
            <Suspense fallback={<LoadingProducts />}>
              <ProductList productsPromise={productsPromise} />
            </Suspense>
          </ErrorBoundary>
        </section>

        <section className="panel">
          <h2>User Registration</h2>
          <p>Register with your name, email, and password.</p>
        </section>
      </section>
    </main>
  );
}

export default App;
