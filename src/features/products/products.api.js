import toast from "react-hot-toast";

export async function getAllProducts() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);

    if (!res.ok) throw new Error("Error Making the Request");

    const { data } = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
  }
}

export async function getSpecificProduct(productId) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`
    );

    if (!res.ok) throw new Error("Error Making the Request");

    const { data } = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
  }
}
