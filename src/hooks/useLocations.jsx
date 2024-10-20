import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useLocations() {
  const { data: departments, isLoading } = useSWR("/api/locations", fetcher);
  return {
    departments,
    isLoading,
  };
}
