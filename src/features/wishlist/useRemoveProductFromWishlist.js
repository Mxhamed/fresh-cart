import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProduct } from "./wishlist.api";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastMessages = [
  "Removed from your wishlist. Ready to make room for new favorites? 🌈",
  "We've removed that from your wishlist. Found something better? 😊",
  "Item removed from your saved favorites 📤",
  "No longer wishing for this one? We've removed it from your list 🔄",
];

export function useRemoveProductFromWishlist() {
  const { userToken, logout } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: removeProduct,

    // Optimistic Update
    onMutate: async ({ productId }) => {
      // Cancel any Outgoing Re-Fetches (So They Do NOT Overwrite the Optimistic Update)
      await queryClient.cancelQueries({
        queryKey: ["wishlist", userToken],
      });

      // Snapshot the Previous Value
      const previousWishlist = queryClient.getQueryData([
        "wishlist",
        userToken,
      ]);

      // Optimistically Update by Removing the Product from Wishlist
      queryClient.setQueryData(["wishlist", userToken], (old) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.filter((item) => item.id !== productId),
        };
      });

      // Return a Context Object with the Snapshotted Value
      return { previousWishlist };
    },

    // Validate and Re-Fetch Wishlist
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", userToken],
      });

      const index = Math.floor(Math.random() * 4);
      toast.success(toastMessages.at(index));
    },

    // Token is INVALID if Request Failed OR Revert Optimistic Update
    onError: (error, variables, context) => {
      // If We have Context (from onMutate) -> Restore the Previous Value
      if (context?.previousWishlist) {
        queryClient.setQueryData(
          ["wishlist", userToken],
          context.previousWishlist
        );
      }

      // Handle Authentication Error
      logout();
      navigate("/signin");
    },

    // Keeping Sync with Server
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", userToken],
      });
    },
  });

  return { mutate, isPending };
}
