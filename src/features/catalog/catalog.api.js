import toast from "react-hot-toast";

export async function getAllCategories() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`);

    if (!res.ok) throw new Error("Error Making the Request");

    const { data } = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
  }
}

export async function getAllBrands() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/brands`);

    if (!res.ok) throw new Error("Error Making the Request");

    const { data } = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
  }
}
