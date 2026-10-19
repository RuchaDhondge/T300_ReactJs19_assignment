import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { preconnect, prefetchDNS, preload } from "react-dom";
import headphonesImage from "./assets/products/headphones.svg";
import App from "./App";
import "./index.css";

const assetOrigin = new URL(headphonesImage, window.location.href).origin;

prefetchDNS(assetOrigin);
preconnect(assetOrigin);
preload(headphonesImage, { as: "image" });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
