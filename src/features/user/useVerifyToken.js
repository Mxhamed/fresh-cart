import { useUser } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "./user.api";

export function useVerifyToken() {
  const { userToken } = useUser();

  const { data, isPending, isError } = useQuery({
    queryKey: ["verifyToken", userToken],
    queryFn: () => verifyToken(userToken),

    staleTime: 30 * 60 * 1000, // 30 mins
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    enabled: !!userToken,
  });

  // If NO User Token Exists or if Token is Invalid -> False
  const isValid = userToken && data && !isError;
  const actualIsPending = userToken && isPending;

  return { isValid, isPending: actualIsPending };
}
