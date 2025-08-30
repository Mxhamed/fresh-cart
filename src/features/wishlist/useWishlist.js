import { useUser } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./wishlist.api";

export function useWishlist() {
  const { userToken } = useUser();

  const {
    data: wishlist,
    isPending,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["wishlist", userToken],
    queryFn: () => getWishlist(userToken),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    enabled: !!userToken,
  });

  return { wishlist, isPending, isFetching, error };
}
