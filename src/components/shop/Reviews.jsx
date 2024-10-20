import Rating from "../ui/Rating";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import useReviewModal from "@/hooks/reviews/useReviewModal";
import { useTranslations } from "next-intl";

export default function Reviews({
  reviews,
  averageRating,
  title,
  basedOn,
  writeReviewBtnText,
}) {
  const t = useTranslations("Shop.review");
  const { data: session, status } = useSession();
  const { handleReviewModal } = useReviewModal();

  const userExistReview = reviews?.find(
    (review) => review.usuario.id === session?.user.id
  );

  return (
    <div className="py-5">
      <div className="px-4 md:px-8">
        <h2 className="text-center text-2xl font-bold pb-10">{title}</h2>
        <div className="mb-4 flex items-center justify-between border-t border-b border-neutral py-4">
          <div className="flex flex-col gap-0.5">
            <div className="font-bold text-lg flex gap-5 items-center">
              Total
              <Rating rating={averageRating} />
            </div>
            <span className="block text-sm text-base-200">{basedOn}</span>
          </div>
          <button
            onClick={() =>
              status === "unauthenticated"
                ? toast.error(t("noSession"))
                : userExistReview
                ? toast.error(t("alreadyReviewed"))
                : handleReviewModal()
            }
            className="btn btn-outline border-neutral"
          >
            {writeReviewBtnText}
          </button>
        </div>
        <div className="divide-y">
          <div className="flex flex-col gap-5 py-4 md:py-8">
            {reviews?.map((review) => (
              <div key={review.id} className="flex flex-col gap-2">
                <div className="text-lg font-bold flex gap-5 items-center">
                  {review.usuario.nombre + " " + review.usuario.apellido}{" "}
                  <Rating rating={review.puntuacion} />
                </div>
                <span className="block text-sm text-base-200">
                  {new Date(review.fechaCreacion).toLocaleDateString()}
                </span>
                <p className="text-secondary">{review.comentario}</p>
                <div className="divider my-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
