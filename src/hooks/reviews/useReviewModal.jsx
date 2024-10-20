import { useRecoilState } from "recoil";
import { reviewModalState } from "@/atoms/reviewModalState";

export default function useReviewModal() {
  const [isOpen, setIsOpen] = useRecoilState(reviewModalState);

  const handleReviewModal = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, handleReviewModal };
}
