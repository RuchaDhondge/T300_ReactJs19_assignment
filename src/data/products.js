import headphonesImage from "../assets/products/headphones.svg";
import shoesImage from "../assets/products/shoes.svg";
import watchImage from "../assets/products/watch.svg";

function createProductsPromise(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to load products. Please try again."));
        return;
      }

      resolve([
        {
          id: 1,
          name: "Wireless Headphones",
          price: 2499,
          category: "Electronics",
          image: headphonesImage,
          description: "Over-ear wireless headphones with noise isolation."
        },
        {
          id: 2,
          name: "Running Shoes",
          price: 3299,
          category: "Footwear",
          image: shoesImage,
          description: "Lightweight training shoes designed for daily runs."
        },
        {
          id: 3,
          name: "Smart Watch",
          price: 5499,
          category: "Wearables",
          image: watchImage,
          description: "Track activity, heart rate, and notifications on the go."
        }
      ]);
    }, 2000);
  });
}

export const productsPromise = createProductsPromise();
