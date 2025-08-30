import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "./wishlist.api";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const toastMessages = [
  "Saved for later! Added to your wishlist 💖",
  "This item is now in your wishlist! Dream away 🌟",
  "We've added this to your wishlist for safe keeping! 📌",
  "Nice find! We've saved this to your wishlist 🎯",
];

export function useAddProductToWishlist() {
  const { userToken, logout } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,

    // Validate and Re-Fetch Wishlist
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist", userToken],
      });

      const index = Math.floor(Math.random() * 4);
      toast.success(toastMessages.at(index));
    },

    // Token is INVALID if Request Failed
    onError: (a, b, context) => {
      logout();
      navigate("/signin");
      queryClient.setQueryData(
        ["wishlist", userToken],
        context.previousWishlist
      );
    },

    // Optimistic Updates
    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist", userToken] });

      const previousWishlist = queryClient.getQueryData([
        "wishlist",
        userToken,
      ]);

      queryClient.setQueryData(["wishlist", userToken], (old) => ({
        ...old,
        data: [...(old?.data || []), { id: productId }],
      }));

      return { previousWishlist };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", userToken] });
    },
  });

  return { mutate, isPending };
}
