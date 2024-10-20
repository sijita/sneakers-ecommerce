import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";
import { useTranslations } from "next-intl";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useLikeProduct() {
  const t = useTranslations("Loading");
  const { data: session, status } = useSession();
  const {
    data: favorites,
    isLoading,
    error,
  } = useSWR(
    session?.user.id ? `/api/favorites?user=${session?.user.id}` : null,
    fetcher
  );

  const handleLike = async (id) => {
    let loadingToastId = null;
    try {
      loadingToastId = toast.loading(t("text"));
      const res = await axios.post("/api/favorites", {
        productId: id,
        userId: session.user.id,
      });

      toast.dismiss(loadingToastId);
      mutate(`/api/favorites?user=${session?.user.id}`);

      return toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  const handleUnlike = async (id) => {
    let loadingToastId = null;
    try {
      loadingToastId = toast.loading(t("text"));
      const res = await axios.delete(`/api/favorites/${id}`);

      toast.dismiss(loadingToastId);

      mutate(`/api/favorites?user=${session?.user.id}`);
      return toast.success(res.data);
    } catch (error) {
      toast.dismiss(loadingToastId);
      return toast.error(error.response.data.error);
    }
  };

  return {
    handleLike,
    handleUnlike,
    favorites,
    isLoading,
    status,
    error,
  };
}
