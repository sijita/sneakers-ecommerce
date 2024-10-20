import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useTranslations } from "next-intl";

export default function useAddReview() {
  const t = useTranslations("Shop.review");
  const t2 = useTranslations("Loading");
  const { data: session } = useSession();

  const addReview = async (review) => {
    let loadingToastId = null;

    if (review.rating && review.review && review.productId) {
      try {
        loadingToastId = toast.loading(t2("text"));
        const response = await axios.post("/api/reviews", {
          productoId: review.productId,
          puntuacion: review.rating,
          comentario: review.review,
          usuarioId: session.user.id,
        });

        toast.dismiss(loadingToastId);

        mutate(`/api/products/${review.productId}`);
        mutate(`/api/products/featured`);

        return toast.success(response.data);
      } catch (error) {
        toast.dismiss(loadingToastId);
        return toast.error(error.response.data.error);
      }
    } else {
      return toast.error(t("requiredFields"));
    }
  };

  return {
    addReview,
  };
}
