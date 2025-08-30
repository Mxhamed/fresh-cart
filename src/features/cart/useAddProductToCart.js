import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./cart.api";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastMessages = [
  "Item added to your cart! 🛒",
  "Shopping cart +1! Your style journey continues ✨",
  "This item is now waiting in your cart! 📦",
  "Great choice! Added to your shopping bag 🛍️",
];

export function useAddProductToCart() {
  const { userToken, logout } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,

    // Validate and Re-Fetch Cart
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userToken],
      });

      // Random Message
      const index = Math.floor(Math.random() * 4);
      toast.success(toastMessages.at(index));
    },

    // Token is INVALID if Request Failed
    onError: () => {
      logout();
      navigate("/signin");
    },
  });

  return { mutate, isPending };
}
