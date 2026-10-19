import { Suspense, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ProductList from "./components/ProductList";
import RegistrationForm from "./components/RegistrationForm";
import RegisteredUserInfo from "./components/RegisteredUserInfo";
import UserContext from "./context/UserContext";
import { productsPromise } from "./data/products";

function LoadingProducts() {
  return <p className="state-message">Loading products...</p>;
}

function App() {
  const [registeredUser, setRegisteredUser] = useState(null);

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
