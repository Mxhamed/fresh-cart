import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearAll } from "./cart.api";

import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const toastMessages = [
  "Cart cleared! Fresh start with an empty basket 🧹",
  "All items removed! Your cart is now empty 📭",
  "Cart emptied! Ready for new discoveries? 🌟",
  "Clean slate! All items have been removed from your cart 🔄",
];

export function useClearAllCartItems() {
  const { userToken, logout } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: clearAll,

    // Validate and Re-Fetch Cart
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userToken],
      });

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
