import toast from "react-hot-toast";

export async function getCart(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
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
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data?.status === "success") return true;
  } catch (error) {
    toast.error(error.message, {
      id: "addProductToCart",
    });
    return false;
  }
}

export async function updateProductQuantity({ token, productId, quantity }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          count: quantity,
        }),
      }
    );

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data.status === "success") return true;
  } catch (error) {
    toast.error(error.message, {
      id: "updateProductQuantity",
    });
    return false;
  }
}

export async function removeProduct({ token, productId }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/cart/${productId}`,
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
  } catch (error) {
    toast.error(error.message, {
      id: "removeProductFromCart",
    });
    return false;
  }
}

export async function clearAll(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data?.status === "success") return true;
  } catch (error) {
    toast.error(error.message, {
      id: "removeProductFromCart",
    });
    return false;
  }
}
