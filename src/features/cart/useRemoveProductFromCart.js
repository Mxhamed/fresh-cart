import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProduct } from "./cart.api";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastMessages = [
  "Item removed from your cart 👋",
  "We've removed that from your cart. Changed your mind? 🧐",
  "Item taken out of your shopping bag 🛍️",
  "No problem! We've removed that from your cart 🔄",
];

export function useRemoveProductFromCart() {
  const { userToken, logout } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: removeProduct,

    onMutate: async ({ productId, token }) => {
      await queryClient.cancelQueries({
        queryKey: ["cart", token],
      });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(["cart", token]);

      queryClient.setQueryData(["cart", token], (old) => {
        if (!old || !old.data || !Array.isArray(old.data.products)) {
          return old;
        }

        const removedItem = old.data.products.find(
          (item) => item.product.id === productId
        );

        return {
          ...old,
          data: {
            ...old.data,
            products: old.data.products.filter(
              (item) => item.product.id !== productId
            ),

            totalCartPrice:
              old.data.totalCartPrice && removedItem
                ? old.data.totalCartPrice -
                  removedItem.price * removedItem.count
                : old.data.totalCartPrice,
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

      logout();
      navigate("/signin");
    },
  });

  return { mutate, isPending };
}
