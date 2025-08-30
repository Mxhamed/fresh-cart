import toast from "react-hot-toast";

export async function verifyToken(token) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/verifyToken`,
      {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    if (!res.ok) throw new Error("Error Making the Request");

    const { message } = await res.json();
    return message === "verified";
  } catch (error) {
    toast.error(error.message, {
      id: "verifyTokenToast",
    });
    return error;
  }
}

export async function signUp(signUpData) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      }
    );

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data?.message === "success") return true;
  } catch (error) {
    toast.error(error.message, {
      id: "signUpToast",
    });
  }
}

export async function signIn(signInData) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      }
    );

    const data = await res.json();

    if (data?.statusMsg === "fail") throw new Error(data.message);

    if (data?.message === "success")
      return {
        token: data.token,
        name: data.user.name,
        email: data.user.email,
      };
  } catch (error) {
    toast.error(error.message, {
      id: "signInToast",
    });
  }
}
