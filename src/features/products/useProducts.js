import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./products.api";

export function useProducts() {
  const { data, isPending, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { data, isPending, error };
}
