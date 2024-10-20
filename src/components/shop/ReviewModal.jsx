import MyModal from "../ui/MyModal";
import ReviewForm from "./ReviewForm";

export default function ReviewModal({
  isOpen,
  closeModal,
  productId,
  title,
  ratingPlaceholder,
  reviewPlaceholder,
  saveBtnText,
}) {
  return (
    <MyModal title={title} isOpen={isOpen} closeModal={closeModal}>
      <ReviewForm
        productId={productId}
        ratingPlaceholder={ratingPlaceholder}
        reviewPlaceholder={reviewPlaceholder}
        saveBtnText={saveBtnText}
      />
    </MyModal>
  );
}
