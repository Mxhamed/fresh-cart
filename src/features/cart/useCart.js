import { useUser } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "./cart.api";

export function useCart() {
  const { userToken } = useUser();

  const {
    data: cart,
    isPending,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["cart", userToken],
    queryFn: () => getCart(userToken),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    enabled: !!userToken,
  });

  return { cart, isPending, isFetching, error };
}
