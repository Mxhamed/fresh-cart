import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductQuantity } from "./cart.api";

import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const toastMessages = [
  "Quantity updated! Your cart has been refreshed 🔄",
  "Changed your mind? Quantity adjusted successfully! ✅",
  "Updated! Your cart reflects the new quantity 📦",
  "Quantity modified! Your shopping bag is updated 🛍️",
];

export function useUpdateProductCartQuantity() {
  const { userToken, logout } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductQuantity,

    // Optimistic Update
    onMutate: async ({ productId, quantity, token }) => {
      await queryClient.cancelQueries({
        queryKey: ["cart", token],
      });

      // Snapshot the Previous Value
      const previousCart = queryClient.getQueryData(["cart", token]);

      queryClient.setQueryData(["cart", token], (old) => {
        if (!old || !old.data || !Array.isArray(old.data.products)) {
          return old;
        }

        return {
          ...old,
          data: {
            ...old.data,
            products: old.data.products.map((item) => {
              if (item.product.id === productId) {
                return {
                  ...item,
                  count: quantity,
                };
              }
              return item;
            }),

            totalCartPrice: old.data.totalCartPrice
              ? old.data.products.reduce((total, item) => {
                  if (item.product.id === productId) {
                    return total + item.price * quantity;
                  }
                  return total + item.price * item.count;
                }, 0)
              : undefined,
          },
        };
      });

      return { previousCart };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userToken],
      });

      const index = Math.floor(Math.random() * 4);
      toast.success(toastMessages.at(index));
    },

    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userToken], context.previousCart);
      }

      // Token is INVALID if Request Failed
      logout();
      navigate("/signin");
    },
  });

  return { mutate, isPending };
}
