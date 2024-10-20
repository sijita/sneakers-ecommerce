import React, { useState } from "react";
import ProductRating from "../ui/ProductRating";
import useAddReview from "@/hooks/reviews/useAddReview";
import useReviewModal from "@/hooks/reviews/useReviewModal";

export default function ReviewForm({
  productId,
  ratingPlaceholder,
  reviewPlaceholder,
  saveBtnText,
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { addReview } = useAddReview();
  const { handleReviewModal } = useReviewModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ rating, review, productId });
    setRating(0);
    setReview("");
    handleReviewModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-xl">{ratingPlaceholder}</label>
        <ProductRating rating={rating} setRating={setRating} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">{reviewPlaceholder}</label>
        <textarea
          onChange={(e) => setReview(e.target.value)}
          value={review}
          rows={2}
          className="textarea border w-full border-neutral text-lg h-20"
          minLength={20}
          maxLength={110}
        ></textarea>
      </div>
      <button className="btn btn-outline border-neutral">{saveBtnText}</button>
    </form>
  );
}
