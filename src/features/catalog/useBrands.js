import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "./catalog.api";

function useBrands() {
  const { data: brands, isPending } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });

  return { brands, isPending };
}

export default useBrands;
