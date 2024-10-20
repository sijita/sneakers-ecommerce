import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useViewOrders() {
  const { data: session, status } = useSession();
  const {
    data: orders,
    isLoading,
    error,
  } = useSWR(
    status === "authenticated" ? `/api/orders?user=${session?.user.id}` : null,
    fetcher
  );

  return {
    orders,
    isLoading,
    error,
  };
}
