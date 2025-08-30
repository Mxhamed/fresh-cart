import toast from "react-hot-toast";

export async function getWishlist(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    if (!res.ok) throw new Error("Error Making the Request");

    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

export async function addProduct({ token, productId }) {
  const payload = { productId };
  payload;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data?.status === "success") return true;

    return data;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}

export async function removeProduct({ token, productId }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data?.status === "success") return true;

    return data;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}
