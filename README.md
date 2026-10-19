# React 19 Features Assignment

This repository contains the Task 1 implementation of a mini e-commerce application using React 19 features.

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
- Async behavior is simulated using `setTimeout` via `wait(1400)`.

### 7) Context using React 19 provider syntax
- Context is defined in [UserContext.jsx](./src/context/UserContext.jsx).
- Provider syntax uses:
  - `<UserContext value={registeredUser}>...</UserContext>`
  - (React 19 style, without `.Provider` wrapper for new code)
- Registered user information is displayed in [RegisteredUserInfo.jsx](./src/components/RegisteredUserInfo.jsx).

## Run locally

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```