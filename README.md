# React 19 Features Assignment

This repository contains the Task 1 and Task 2 implementation of a mini e-commerce application using React 19 features.

## Implemented features (Task 1)

### 1) Product listing
- Displays:
  - Product name
  - Price
  - Category
  - Product image
  - Short description
- Product data is returned from a simulated async Promise in [products.js](./src/data/products.js).

### 2) `use()` with `<Suspense>`
- `use()` is used inside [ProductList.jsx](./src/components/ProductList.jsx) to consume `productsPromise`.
- The listing is wrapped in `<Suspense>` in [App.jsx](./src/App.jsx).
- While data is loading, a fallback UI (`Loading products...`) is shown.
- Error state is handled by [ErrorBoundary.jsx](./src/components/ErrorBoundary.jsx).

### 3) Document Metadata (React 19)
- Metadata is declared directly in [App.jsx](./src/App.jsx):
  - `<title>Mini E-Commerce Store - Products</title>`
  - `<meta name="description" ... />`
- React 19 moves these to `document.head` automatically.

### 4) Asset loading APIs used
Implemented in [main.jsx](./src/main.jsx):
- `preload(headphonesImage, { as: "image" })`
- `preconnect(assetOrigin)`
- `prefetchDNS(assetOrigin)`

Why these APIs were selected:
- `preload` starts fetching a key product image early.
- `preconnect` warms up connection to the resolved asset origin.
- `prefetchDNS` resolves DNS early for the same origin.

### 5) Registration form with React 19 form actions
Implemented in [RegistrationForm.jsx](./src/components/RegistrationForm.jsx):
- Uses `<form action={formAction}>` (no traditional `onSubmit`)
- Uses `useActionState()` for action state management
- Uses `useFormStatus()` in a child submit button for pending status

### 6) Validation + async submission
- Validates:
  - required name
  - valid email format
  - minimum password length
- Shows:
  - field-level validation messages
  - pending state
  - success state
- Async behavior is simulated using `setTimeout` via `wait(2000)`.

### 7) Context using React 19 provider syntax
- Context is defined in [UserContext.jsx](./src/context/UserContext.jsx).
- Provider syntax uses:
  - `<UserContext value={registeredUser}>...</UserContext>`
  - (React 19 style, without `.Provider` wrapper for new code)
- Registered user information is displayed in [RegisteredUserInfo.jsx](./src/components/RegisteredUserInfo.jsx).

## Implemented features (Task 2)

### 1) Product details flow
- Product selection is handled from the listing in [ProductList.jsx](./src/components/ProductList.jsx).
- Selected product details are shown in [ProductDetails.jsx](./src/components/ProductDetails.jsx), including:
  - Product name
  - Price
  - Description
  - Product image

### 2) Add to cart with `useOptimistic()`
- Cart state is maintained in [App.jsx](./src/App.jsx).
- `useOptimistic()` is used to update cart count immediately before async confirmation.
- Flow:
  1. Cart count increments optimistically.
  2. Async request is simulated (`setTimeout`, 2000ms).
  3. On success, confirmed count is persisted.
  4. On failure, optimistic value rolls back to confirmed count and error is shown.
- A failure toggle is provided for easy demo/testing of rollback behavior.

### 3) Ref as a prop (without `forwardRef`)
- Implemented in [FocusableInput.jsx](./src/components/FocusableInput.jsx):
  - `ref` is accepted directly as a prop in a function component.
- Used in [RefFeatureDemo.jsx](./src/components/RefFeatureDemo.jsx) to focus input via button click.

### 4) Callback ref cleanup
- Demonstrated in [RefFeatureDemo.jsx](./src/components/RefFeatureDemo.jsx):
  - Callback ref attaches a `focus` event listener.
  - Returns cleanup function to remove listener when ref changes or element unmounts.
  - Mount/unmount toggle is included to visibly verify cleanup behavior.

### 5) Server and Client Components (conceptual split for this app)

Because this project is a Vite client app, this section is conceptual (actual RSC setup typically requires frameworks such as Next.js).

- **Product Details as a Server Component candidate**
  - Mostly data-driven rendering.
  - Good for server-side data fetching and SEO-friendly HTML output.
  - Does not inherently require client interactivity to render base content.

- **Add to Cart as a Client Component**
  - Requires click handlers, pending UI, optimistic updates, and immediate interaction feedback.
  - Uses client-side state (`useState`, `useOptimistic`) and browser event handling.

- **How they work together in an e-commerce app**
  - Server component renders product information and initial page content.
  - Client component hydrates interactive actions like Add to Cart on top of that content.
  - This split reduces shipped JavaScript for static content while preserving rich interactivity where needed.

### 6) React Compiler (what it does and this app example)

- React Compiler is a build-time optimization tool that can reduce unnecessary re-renders and often lower the need for manual `React.memo`, `useMemo`, and `useCallback`.
- It does not change application logic; it applies only proven-safe optimizations.

**Relevant example in this app:**
- In product listing and details flows, many renders are state-driven (selection, cart updates, form states).
- With compiler-enabled builds, stable subtrees/components can be optimized automatically where safe, helping reduce extra re-renders without adding manual memoization boilerplate.

## Run locally

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```